# Koa-App 项目架构文档

## 1. 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Koa.js | ^3.2.0 |
| 路由 | koa-router | ^13.1.1 |
| 解析 | koa-bodyparser | ^4.4.1 |
| ORM | Sequelize | ^6.37.8 |
| 数据库 | MySQL | - |
| 运行 | Node.js | - |

## 2. 项目结构

```
koa-app/
├── src/
│   ├── app.js                    # Koa 应用入口
│   ├── db/
│   │   └── mysql.js             # Sequelize 实例
│   ├── config/
│   │   └── db.js                # 数据库配置
│   ├── constant/
│   │   └── responseStatus.js   # 响应状态码定义
│   ├── controllers/
│   │   └── user.controller.js   # 用户控制器
│   ├── middleware/
│   │   ├── logger.js            # 请求日志中间件
│   │   └── response.js          # 统一响应格式中间件
│   ├── model/
│   │   └── user.js              # User 模型
│   ├── routes/
│   │   └── index.js             # 路由配置
│   └── service/
│       └── crud.js              # 通用 CRUD 服务
└── skills/                       # 项目规范文档
```

## 3. 核心模块

### 3.1 应用入口 (app.js)

```
app.js:1-23
├── Koa 实例创建
├── Middleware 加载顺序:
│   ├── logger (日志记录)
│   ├── responseMiddleware (统一响应)
│   └── bodyParser (请求体解析)
├── Router 挂载
└── 监听端口 3000
```

### 3.2 中间件

| 中间件 | 文件 | 职责 |
|--------|------|------|
| logger | middleware/logger.js | 记录请求方法、URL、耗时 |
| response | middleware/response.js | 注入 ctx.util 提供 resuccess/refail |

### 3.3 控制器 (user.controller.js)

使用 `createCrudService(User)` 创建 CRUD 服务实例。

| 方法 | 路由 | 描述 |
|------|------|------|
| getUsers | GET /user/users | 获取用户列表(分页) |
| getUserById | GET /user/users/:id | 获取单个用户 |
| addUser | POST /user/add | 添加用户 |
| updateUser | PUT /user/users/:id | 更新用户 |
| deleteUser | DELETE /user/users/:id | 删除用户 |

### 3.4 Service 层 (service/crud.js)

通用 CRUD 服务，通过传入 Model 实例化：

```javascript
createCrudService(Model) => {
  create(), findAll(), findById(), findOne(),
  update(), updateById(), delete(), deleteById(),
  bulkCreate(), count(), exists(), paginate()
}
```

### 3.5 Model 层 (model/user.js)

Sequelize ORM 模型定义：
- 表名: User
- 主键: id (自增)
- 字段: name, age
- 自动时间戳: created_at, updated_at

## 4. 响应格式

### 成功响应
```json
{
  "errno": 0,
  "data": { ... },
  "message": "success"
}
```

### 失败响应
```json
{
  "errno": 1,
  "data": null,
  "message": "错误描述"
}
```

## 5. 数据库

- 数据库名: inherit_user
- 用户表: User
- 连接池: max=5, min=0
- 时区: +08:00

## 6. API 路由汇总

| 方法 | 路径 | 控制器方法 |
|------|------|-----------|
| GET | /user/users | getUsers |
| GET | /user/users/:id | getUserById |
| POST | /user/add | addUser |
| PUT | /user/users/:id | updateUser |
| DELETE | /user/users/:id | deleteUser |
