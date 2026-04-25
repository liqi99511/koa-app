# Koa-App 开发规范

## 1. 项目初始化

### 1.1 安装依赖
```bash
npm install
```

### 1.2 启动开发服务器
```bash
npm run dev   # 使用 nodemon 监听文件变化
npm start     # 生产环境启动
```

## 2. 目录规范

### 2.1 目录结构
```
src/
├── app.js              # 应用入口，只做初始化和挂载
├── db/                 # 数据库连接
├── config/             # 配置文件
├── constant/           # 常量定义
├── controllers/       # 控制器，处理请求逻辑
├── middleware/         # 中间件
├── model/              # Sequelize 模型定义
├── routes/             # 路由配置
└── service/            # 业务逻辑服务
```

### 2.2 文件命名
- 使用 kebab-case: `user-controller.js`
- 控制器: `*.controller.js`
- 中间件: `*.js`
- 模型: `*.js`

## 3. 路由规范

### 3.1 RESTful 路由设计

| 操作 | 方法 | 路径 | 控制器方法 |
|------|------|------|-----------|
| 列表 | GET | /resource | getList |
| 详情 | GET | /resource/:id | getById |
| 创建 | POST | /resource | create |
| 更新 | PUT | /resource/:id | update |
| 删除 | DELETE | /resource/:id | delete |

### 3.2 路由定义示例
```javascript
// routes/index.js
router.get('/resource', controller.getList)
router.get('/resource/search', controller.search)  // 特殊路径放前面
router.get('/resource/:id', controller.getById)     // 动态参数路由放后面
router.post('/resource', controller.create)
router.put('/resource/:id', controller.update)
router.delete('/resource/:id', controller.delete)
```

### 3.3 路由顺序注意事项
- **动态参数路由（如 `:id`）会匹配任何字符串**，包括 `search`、`list` 等特殊路径
- 自定义路径（如 `/user/search`）必须放在动态参数路由（如 `/user/users/:id`）之前
- 路由匹配从上到下执行，第一个匹配的路由会被使用

## 4. 控制器规范

### 4.1 控制器结构
```javascript
// 必须使用 async/await
const getUser = async (ctx) => {
  try {
    // 1. 参数获取
    const { id } = ctx.params
    const { page, pageSize } = ctx.query

    // 2. 调用 service
    const result = await userCrud.findById(id)

    // 3. 响应成功
    ctx.body = ctx.util.resuccess(result)
  } catch (error) {
    // 4. 捕获异常
    ctx.body = ctx.util.refail(error.message || '服务器错误')
  }
}
```

### 4.2 参数校验
- 使用 `ctx.query` 获取 URL 查询参数
- 使用 `ctx.params` 获取路径参数
- 使用 `ctx.request.body` 获取请求体参数
- 必填参数缺失时返回 `ctx.util.refail('缺少参数 xxx')`

## 5. Service 规范

### 5.1 使用通用 CRUD 服务
```javascript
const { createCrudService } = require('../service/crud')
const User = require('../model/user')
const userCrud = createCrudService(User)
```

### 5.2 分页查询
```javascript
const result = await userCrud.paginate({
  page: Number(page),
  pageSize: Number(pageSize),
  order: [['created_at', 'DESC']]
})
```

## 6. 模型规范

### 6.1 模型定义
```javascript
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER }
}, {
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
```

## 7. 中间件规范

### 7.1 顺序
```
logger -> response -> bodyParser -> router
```

### 7.2 自定义中间件
```javascript
module.exports = async (ctx, next) => {
  // 前置逻辑
  await next()
  // 后置逻辑
}
```

## 8. 响应规范

### 8.1 成功响应
```javascript
ctx.body = ctx.util.resuccess(data, '操作成功')
```

### 8.2 失败响应
```javascript
ctx.body = ctx.util.refail('错误描述')
```

## 9. Git 提交规范

### 9.1 提交信息格式
```
<type>: <subject>

<type>: feat | fix | docs | style | refactor | test | chore
<subject>: 简短描述
```

### 9.2 示例
```
feat: 添加用户删除接口
fix: 修复分页查询参数问题
docs: 更新 README
```

## 10. 数据库规范

### 10.1 表命名
- 使用下划线命名
- 名称用单数: `user`, `order_item`

### 10.2 字段命名
- 主键: `id`
- 时间戳: `created_at`, `updated_at`
- 软删除: `deleted_at`
