const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const logger = require('./middleware/logger')
const responseMiddleware = require('./middleware/response')

const router = require('./routes')

const app = new Koa()

app.use(logger)
app.use(responseMiddleware)

// 解析请求体
app.use(bodyParser())

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})