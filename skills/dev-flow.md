# 🧠 Skill：Node 服务开发与质量闭环（Dev Flow Skill）

---

## 📌 一、Skill 概述

本 Skill 用于规范从 **需求 → 技术文档 → 开发 → 测试 → 交付 → 规范沉淀** 的完整流程，结合 MCP 工具实现自动化测试与 Postman 留痕。

---

## 🎯 二、目标

| 目标 | 说明 |
|------|------|
| 标准化流程 | 需求 → 开发 → 测试 → 交付 |
| 自动化测试 | MCP 工具自动调用接口 |
| 可追溯 | Postman 请求留痕 |
| 规范化 | 开发规范 + CR 规范 |
| 持续优化 | 反馈闭环 |

---

## 📥 三、输入（Input）

| 输入项 | 说明 |
|--------|------|
| 需求描述 | 功能需求或 PRD |
| 现有项目 | koa-app 项目代码 |

---

## 📤 四、输出（Output）

| 输出项 | 说明 |
|--------|------|
| 技术文档 | 接口设计、数据模型 |
| 测试用例 | 正常/异常/边界覆盖 |
| 开发规范 | koa-app/skills/development.md |
| CR 规范 | koa-app/skills/code-review.md |
| 架构文档 | koa-app/skills/architecture.md |
| 测试报告 | 自测结果 |
| Postman 记录 | 请求痕迹 |

---

## 🔄 五、核心流程

### 阶段 1️⃣：需求分析

```
需求描述 → 技术文档（接口设计 + 数据模型）
```

**操作：**
1. 解析业务需求
2. 设计 RESTful 接口
3. 定义数据模型

**输出：** 接口设计文档

---

### 阶段 2️⃣：测试设计

```
技术文档 → 测试用例
```

**用例类型：**
- [ ] 正常流程
- [ ] 边界情况
- [ ] 异常情况

**输出：** 测试用例列表

---

### 阶段 3️⃣：开发实现

```
技术文档 + 开发规范 → 代码实现
```

**依赖：**
- `skills/development.md` - 开发规范
- `skills/architecture.md` - 架构文档

**文件修改：**
- `src/routes/index.js` - 添加路由
- `src/controllers/*.js` - 控制器
- `src/service/*.js` - 业务逻辑
- `src/model/*.js` - 数据模型

---

### 阶段 4️⃣：代码评审（CR）

```
代码 → Code Review
```

**依据：** `skills/code-review.md`

**检查项：**
- [ ] 路由规范
- [ ] 控制器结构
- [ ] 错误处理
- [ ] 参数校验
- [ ] 代码风格

---

### 阶段 5️⃣：自测执行

```
代码 → MCP 自动测试
```

**MCP 工具：**
```javascript
// 1. 健康检查
{ "tool": "health_check", "service": "koa-app" }

// 2. HTTP 请求测试
{ "tool": "http_request", "service": "koa-app", "method": "POST", "path": "/user/add", "body": {...} }

// 3. 批量测试
{ "tool": "run_api_test", "service": "koa-app", "testCases": [...] }

// 4. 数据库验证
{ "tool": "db_query", "service": "koa-app", "table": "users", "operation": "select" }
```

**Postman 留痕：**
```javascript
{ "tool": "http_request", "autoImportPostman": true, ... }
```

---

### 阶段 6️⃣：测试报告

```
自测结果 → 测试报告
```

**报告内容：**
- 通过/失败用例
- 覆盖率
- 异常说明

---

## 🔁 六、反馈闭环

| 反馈类型 | 更新内容 |
|----------|----------|
| 开发规范优化 | `skills/development.md` |
| CR 规范优化 | `skills/code-review.md` |
| 架构文档更新 | `skills/architecture.md` |
| 测试用例优化 | 补充边界/异常用例 |

---

## 🧩 七、执行结构

```javascript
{
  name: "node-dev-flow",
  version: "1.0.0",

  steps: [
    { name: "parseRequirement", input: "需求描述", output: "需求分析" },
    { name: "generateTechDoc", input: "需求分析", output: "技术文档" },
    { name: "generateTestCases", input: "技术文档", output: "测试用例" },
    { name: "implementCode", input: "技术文档", output: "代码" },
    { name: "codeReview", input: "代码", output: "CR 结果" },
    { name: "selfTest", input: "代码 + 测试用例", output: "测试报告" },
    { name: "postmanTrace", input: "测试执行", output: "Postman 记录" },
    { name: "generateReport", input: "测试报告", output: "交付报告" }
  ],

  tools: {
    mcp: {
      health_check: "连通性检查",
      http_request: "HTTP 请求",
      run_api_test: "批量测试",
      db_query: "数据库查询",
      assert_response: "断言验证"
    },
    postman: {
      autoImport: true,
      newman: "CLI 运行"
    }
  },

  specs: {
    architecture: "skills/architecture.md",
    development: "skills/development.md",
    codeReview: "skills/code-review.md"
  }
}
```

---

## 📋 八、配套工具

### MCP Server

路径：`/mcp-koa-tester/`

**启动：**
```bash
cd /mcp-koa-tester && npm start
```

**配置：** `config/services.json`

**环境变量：** `.env`（POSTMAN_API_KEY）

### MCP 工具清单

| 工具 | 用途 | Postman 留痕 |
|------|------|--------------|
| health_check | 服务连通性 | 否 |
| http_request | 发送请求 | autoImportPostman |
| run_api_test | 批量测试 | 是 |
| db_query | 数据库验证 | 否 |
| assert_response | 断言 | 否 |

---

## 🚀 九、使用示例

### 完整开发流程

```javascript
// Step 1: 需求 → 添加用户搜索接口
{
  "name": "添加用户搜索接口",
  "endpoint": "/user/search",
  "method": "GET",
  "params": { "name": "string" }
}

// Step 2: MCP 自测
{
  "tool": "run_api_test",
  "testCases": [
    { "name": "搜索存在用户", "path": "/user/search?name=test", "expected": { "errno": 0 } },
    { "name": "搜索不存在用户", "path": "/user/search?name=xxx", "expected": { "errno": 0 } },
    { "name": "缺少参数", "path": "/user/search", "expected": { "errno": 1 } }
  ]
}

// Step 3: Postman 留痕
{
  "tool": "http_request",
  "autoImportPostman": true,
  ...
}
```

---

## 🧾 十、一句话总结

> 本 Skill 是一个以需求为起点，通过 MCP 自动化测试 + Postman 留痕 + 规范沉淀形成持续优化的 Node.js 工程化闭环系统。
