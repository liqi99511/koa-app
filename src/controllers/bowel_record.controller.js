const BowelRecord = require('../model/bowel_record');
const { createCrudService } = require('../service/crud');

const bowelRecordCrud = createCrudService(BowelRecord);

/**
 * 添加排便记录
 * POST /bowel-record/add
 */
const addRecord = async (ctx) => {
  const { user_id, record_time, duration, stool_type, notes } = ctx.request.body;

  if (!user_id || !record_time) {
    ctx.body = ctx.util.refail('缺少参数 user_id 或 record_time');
    return;
  }

  if (stool_type && (stool_type < 1 || stool_type > 4)) {
    ctx.body = ctx.util.refail('stool_type 必须在 1-4 之间');
    return;
  }

  try {
    const record = await bowelRecordCrud.create({
      user_id,
      record_time,
      duration: duration || 0,
      stool_type: stool_type || 3,
      notes: notes || ''
    });
    ctx.body = ctx.util.resuccess(record, '添加成功');
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

/**
 * 获取排便历史记录（支持分页）
 * GET /bowel-record/history?user_id=1&page=1&pageSize=10
 */
const getHistory = async (ctx) => {
  const { user_id, page = 1, pageSize = 10 } = ctx.query;

  if (!user_id) {
    ctx.body = ctx.util.refail('缺少参数 user_id');
    return;
  }

  try {
    const result = await bowelRecordCrud.paginate({
      where: { user_id: Number(user_id) },
      page: Number(page),
      pageSize: Number(pageSize),
      order: [['record_time', 'DESC']]
    });
    ctx.body = ctx.util.resuccess(result);
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

/**
 * 获取单条排便记录
 * GET /bowel-record/:id
 */
const getById = async (ctx) => {
  const { id } = ctx.params;

  try {
    const record = await bowelRecordCrud.findById(id);
    if (!record) {
      ctx.body = ctx.util.refail('记录不存在');
      return;
    }
    ctx.body = ctx.util.resuccess(record);
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

/**
 * 删除排便记录
 * DELETE /bowel-record/:id
 */
const deleteRecord = async (ctx) => {
  const { id } = ctx.params;

  try {
    const deletedCount = await bowelRecordCrud.deleteById(id);
    if (deletedCount === 0) {
      ctx.body = ctx.util.refail('记录不存在');
      return;
    }
    ctx.body = ctx.util.resuccess({ deletedCount }, '删除成功');
  } catch (error) {
    ctx.body = ctx.util.refail(error.message || '服务器错误');
  }
};

module.exports = {
  addRecord,
  getHistory,
  getById,
  deleteRecord
};
