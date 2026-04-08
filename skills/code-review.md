# Koa-App Code Review 规范

## 1. CR 检查清单

### 1.1 路由检查
- [ ] 遵循 RESTful 规范
- [ ] 路由路径命名正确
- [ ] HTTP 方法使用正确

### 1.2 控制器检查
- [ ] 使用 async/await
- [ ] 有完整的 try/catch
- [ ] 必填参数有校验
- [ ] 使用 ctx.util.resuccess/refail

### 1.3 Service 检查
- [ ] 复用通用 CRUD 服务
- [ ] 错误处理完善
- [ ] 参数类型转换正确

### 1.4 模型检查
- [ ] 字段定义完整
- [ ] 数据类型正确
- [ ] 时间戳配置正确

## 2. 代码风格

### 2.1 缩进与空格
```javascript
// ✓ 正确
const result = await userCrud.findById(id)

// ✗ 错误
const result=await userCrud.findById(id)
```

### 2.2 引号
```javascript
// ✓ 正确 - 使用单引号
const name = 'test'

// ✗ 错误 - 避免双引号
const name = "test"
```

### 2.3 分号
```javascript
// ✓ 正确 - 使用分号
ctx.body = ctx.util.resuccess(result)
```

### 2.4 空行
```javascript
// ✓ 正确 - 逻辑块之间空一行
async function getUser(ctx) {
  const { id } = ctx.params

  const user = await userCrud.findById(id)

  ctx.body = ctx.util.resuccess(user)
}
```

## 3. 函数规范

### 3.1 函数定义
```javascript
// ✓ 正确 - 使用 const + async arrow function
const getUsers = async (ctx) => {
  // ...
}

// ✗ 错误 - 避免 function 声明
async function getUsers(ctx) {
  // ...
}
```

### 3.2 参数解构
```javascript
// ✓ 正确 - 使用解构
const { id } = ctx.params
const { name, age } = ctx.request.body

// ✗ 错误 - 直接从 ctx 取
const id = ctx.params.id
```

## 4. 错误处理

### 4.1 控制器错误处理
```javascript
// ✓ 正确
const getUser = async (ctx) => {
  try {
    const { id } = ctx.params
    const user = await userCrud.findById(id)

    if (!user) {
      ctx.body = ctx.util.refail('用户不存在')
      return
    }

    ctx.body = ctx.util.resuccess(user)
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误')
  }
}
```

### 4.2 必填参数校验
```javascript
// ✓ 正确
const addUser = async (ctx) => {
  const { name, age } = ctx.request.body

  if (!name || !age) {
    ctx.body = ctx.util.refail('缺少参数 name 或 age')
    return
  }
  // ...
}
```

## 5. 数据库操作

### 5.1 分页参数处理
```javascript
// ✓ 正确 - 转换为数字
const { page = 1, pageSize = 10 } = ctx.query
const result = await userCrud.paginate({
  page: Number(page),
  pageSize: Number(pageSize)
})
```

### 5.2 时间戳排序
```javascript
// ✓ 正确 - 使用数组格式
const result = await userCrud.findAll({
  order: [['created_at', 'DESC']]
})
```

## 6. 注释规范

### 6.1 控制器注释
```javascript
/**
 * 获取用户列表（支持分页）
 * GET /user/users?page=1&pageSize=10
 */
const getUsers = async (ctx) => {
  // ...
}
```

### 6.2 Service 注释
```javascript
/**
 * 创建数据
 * @param {Object} data - 创建的数据
 * @returns {Promise<Object>}
 */
async create(data) {
  // ...
}
```

## 7. 安全检查

### 7.1 SQL 注入
- ✓ 使用 Sequelize ORM 自动防止 SQL 注入
- ✗ 避免拼接字符串构建查询

### 7.2 参数校验
- ✓ 校验必填参数
- ✓ 校验参数类型
- ✓ 校验参数长度/范围

### 7.3 错误信息
- ✗ 不返回敏感信息到客户端
- ✓ 错误信息使用通用描述

## 8. 性能检查

### 8.1 数据库查询
- ✓ 使用分页避免大数据量返回
- ✓ 合理使用索引
- ✗ 避免 N+1 查询

### 8.2 响应数据
- ✓ 只返回必要字段
- ✓ 使用 attributes 限制返回字段

## 9. CR 常见问题

| 问题 | 严重程度 | 说明 |
|------|----------|------|
| 缺少错误处理 | 高 | 必须有 try/catch |
| 参数未校验 | 高 | 必填参数必须校验 |
| 命名不规范 | 中 | 按项目命名规范 |
| 缺少注释 | 低 | 公共方法需注释 |
| 代码重复 | 中 | 复用通用服务 |

## 10. CR 流程

1. **自检**: 提交前对照检查清单
2. **本地测试**: 确保功能正常
3. **提交 PR**: 描述改动的目的
4. **Review**: 检查代码风格和逻辑
5. **修复**: 根据反馈修改
6. **合并**: 确认无误后合并
