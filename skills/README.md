# Koa-App Skills 概览

## 📚 Skills 列表

| 文件 | 说明 | 用途 |
|------|------|------|
| `dev-flow.md` | 开发流程与质量闭环 | 主流程规范 |
| `architecture.md` | 项目架构文档 | 技术设计参考 |
| `development.md` | 开发规范 | 编码标准 |
| `code-review.md` | CR 规范 | 代码评审标准 |

---

## 🎯 快速开始

### 1. 开发新功能

```
需求 → dev-flow.md → 开发规范 → 实现 → CR → 自测 → 交付
```

### 2. 参考文档

| 场景 | 参考文档 |
|------|----------|
| 项目结构 | `architecture.md` |
| 代码规范 | `development.md` |
| CR 检查 | `code-review.md` |
| 完整流程 | `dev-flow.md` |

---

## 🔧 配套工具

### MCP Server
路径：`/mcp-koa-tester/`

```bash
cd /mcp-koa-tester && npm start
```

### 自测命令

```javascript
// MCP 工具调用
http_request({ service: "koa-app", method: "GET", path: "/user/users" })

// Postman 自动导入
http_request({ autoImportPostman: true, ... })
```

---

## 📖 详细内容

详见各独立文档。
