const User = require('../model/user');
const { createCrudService } = require('../service/crud');

// 创建 User 的 CRUD 服务实例
const userCrud = createCrudService(User);

/**
 * 获取用户列表（支持分页）
 * GET /user/users?page=1&pageSize=10
 */
const getUsers = async (ctx) => {
  try {
    const { page = 1, pageSize = 10 } = ctx.query;
    const result = await userCrud.paginate({
      page: Number(page),
      pageSize: Number(pageSize),
      order: [['created_at', 'DESC']],
    });
    ctx.body = ctx.util.resuccess(result);
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

/**
 * 获取单个用户
 * GET /user/users/:id
 */
const getUserById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const user = await userCrud.findById(id);
    if (!user) {
      ctx.body = ctx.util.refail('用户不存在');
      return;
    }
    ctx.body = ctx.util.resuccess(user);
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

/**
 * 添加用户
 * POST /user/add
 */
const addUser = async (ctx) => {
  const { name, age } = ctx.request.body;
  if (!name || !age) {
    ctx.body = ctx.util.refail('缺少参数 name 或 age');
    return;
  }
  try {
    const user = await userCrud.create({ name, age });
    ctx.body = ctx.util.resuccess(user, '添加成功');
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

/**
 * 更新用户
 * PUT /user/users/:id
 */
const updateUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { name, age } = ctx.request.body;

    const affectedCount = await userCrud.updateById(id, { name, age });
    if (affectedCount === 0) {
      ctx.body = ctx.util.refail('用户不存在或没有修改');
      return;
    }
    ctx.body = ctx.util.resuccess({ affectedCount }, '更新成功');
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

/**
 * 删除用户
 * DELETE /user/users/:id
 */
const deleteUser = async (ctx) => {
  try {
    const { id } = ctx.params;
    const deletedCount = await userCrud.deleteById(id);
    if (deletedCount === 0) {
      ctx.body = ctx.util.refail('用户不存在');
      return;
    }
    ctx.body = ctx.util.resuccess({ deletedCount }, '删除成功');
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

/**
 * 搜索用户
 * GET /user/search?name=xxx
 */
const searchUsers = async (ctx) => {
  try {
    const { name } = ctx.query;
    if (!name) {
      ctx.body = ctx.util.refail('缺少参数 name');
      return;
    }
    const result = await userCrud.findAll({
      where: { name: { [require('sequelize').Op.like]: `%${name}%` } }
    });
    ctx.body = ctx.util.resuccess(result);
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  searchUsers,
};