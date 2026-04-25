const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const logger = require('./middleware/logger')
const responseMiddleware = require('./middleware/response')

const router = require('./routes')

const app = new Koa()

// CORS 配置
app.use(cors({
  origin: 'http://localhost:1000',
  credentials: true,
}))

app.use(logger)
app.use(responseMiddleware)

// 解析请求体
app.use(bodyParser())

// 注册路由（添加 /api 前缀）
const apiRouter = new (require('koa-router'))()
apiRouter.use('/api', router.routes(), router.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

const PORT = 9000

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})