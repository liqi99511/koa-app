const Router = require('koa-router')
const router = new Router()

const userController = require('../controllers/user.controller')
const bowelRecordController = require('../controllers/bowel_record.controller')

// 用户相关路由
router.get('/user/users', userController.getUsers)           // 获取用户列表（支持分页）
router.get('/user/search', userController.searchUsers)      // 搜索用户（需放在 /user/users/:id 之前）
router.get('/user/users/:id', userController.getUserById)    // 获取单个用户
router.post('/user/add', userController.addUser)              // 添加用户
router.put('/user/users/:id', userController.updateUser)     // 更新用户
router.delete('/user/users/:id', userController.deleteUser)  // 删除用户

// 排便记录相关路由
router.post('/bowel-record/add', bowelRecordController.addRecord)      // 添加排便记录
router.get('/bowel-record/history', bowelRecordController.getHistory)  // 获取历史记录
router.get('/bowel-record/:id', bowelRecordController.getById)        // 获取单条记录
router.delete('/bowel-record/:id', bowelRecordController.deleteRecord)  // 删除记录

module.exports = router