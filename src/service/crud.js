const { Op } = require('sequelize');

/**
 * 通用 CRUD 服务
 * @param {Model} model - Sequelize 模型
 */
const createCrudService = (model) => {
  return {
    /**
     * 创建数据
     * @param {Object} data - 创建的数据
     * @returns {Promise<Object>}
     */
    async create(data) {
      try {
        const result = await model.create(data);
        return result;
      } catch (error) {
        throw error;
      }
    },

    /**
     * 查询所有数据（支持分页）
     * @param {Object} options - 查询选项
     * @param {Object} options.where - 查询条件
     * @param {Array} options.attributes - 指定返回字段
     * @param {Array} options.order - 排序 [['created_at', 'DESC']]
     * @param {number} options.page - 页码（从1开始）
     * @param {number} options.pageSize - 每页数量
     * @returns {Promise<Object>} { list: [], total: number }
     */
    async findAll(options = {}) {
      const { where = {}, attributes, order, page, pageSize, include } = options;

      const queryOptions = {
        where,
        attributes,
        order: order || [[model.primaryKeyField || 'id', 'DESC']],
        include,
      };

      // 处理分页
      if (page && pageSize) {
        queryOptions.limit = pageSize;
        queryOptions.offset = (page - 1) * pageSize;
      }

      const { count, rows } = await model.findAndCountAll(queryOptions);

      return {
        list: rows,
        total: count,
      };
    },

    /**
     * 根据 ID 查询单条数据
     * @param {number|string} id - 主键 ID
     * @param {Object} options - 查询选项
     * @param {Array} options.attributes - 指定返回字段
     * @returns {Promise<Object|null>}
     */
    async findById(id, options = {}) {
      const { attributes, include } = options;

      const result = await model.findByPk(id, {
        attributes,
        include,
      });

      return result;
    },

    /**
     * 根据条件查询单条数据
     * @param {Object} where - 查询条件
     * @param {Object} options - 查询选项
     * @param {Array} options.attributes - 指定返回字段
     * @returns {Promise<Object|null>}
     */
    async findOne(where, options = {}) {
      const { attributes, include } = options;

      const result = await model.findOne({
        where,
        attributes,
        include,
      });

      return result;
    },

    /**
     * 更新数据
     * @param {Object} data - 更新的数据
     * @param {Object} where - 更新条件
     * @returns {Promise<number>} - 受影响的行数
     */
    async update(data, where) {
      const [affectedCount] = await model.update(data, { where });
      return affectedCount;
    },

    /**
     * 根据 ID 更新数据
     * @param {number|string} id - 主键 ID
     * @param {Object} data - 更新的数据
     * @returns {Promise<number>} - 受影响的行数
     */
    async updateById(id, data) {
      const [affectedCount] = await model.update(data, {
        where: { [model.primaryKeyField || 'id']: id },
      });
      return affectedCount;
    },

    /**
     * 删除数据
     * @param {Object} where - 删除条件
     * @returns {Promise<number>} - 删除的行数
     */
    async delete(where) {
      const deletedCount = await model.destroy({ where });
      return deletedCount;
    },

    /**
     * 根据 ID 删除数据
     * @param {number|string} id - 主键 ID
     * @returns {Promise<number>} - 删除的行数
     */
    async deleteById(id) {
      const deletedCount = await model.destroy({
        where: { [model.primaryKeyField || 'id']: id },
      });
      return deletedCount;
    },

    /**
     * 批量创建
     * @param {Array} dataArray - 数据数组
     * @returns {Promise<Array>}
     */
    async bulkCreate(dataArray) {
      const result = await model.bulkCreate(dataArray);
      return result;
    },

    /**
     * 统计数量
     * @param {Object} where - 查询条件
     * @returns {Promise<number>}
     */
    async count(where = {}) {
      const result = await model.count({ where });
      return result;
    },

    /**
     * 判断是否存在符合条件的记录
     * @param {Object} where - 查询条件
     * @returns {Promise<boolean>}
     */
    async exists(where) {
      const count = await model.count({ where });
      return count > 0;
    },

    /**
     * 分页查询（别名）
     * @param {Object} options - 查询选项
     * @returns {Promise<Object>} { list: [], total: number, page: number, pageSize: number }
     */
    async paginate(options = {}) {
      const { page = 1, pageSize = 10, ...rest } = options;
      const result = await this.findAll({
        ...rest,
        page: Number(page),
        pageSize: Number(pageSize),
      });
      return {
        ...result,
        page: Number(page),
        pageSize: Number(pageSize),
      };
    },
  };
};

module.exports = { createCrudService };