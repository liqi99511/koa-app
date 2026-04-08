const responseStatus = require('../constant/responseStatus');

module.exports = async (ctx, next) => {
    ctx.util = {
        resuccess: (data, message) => {
            return {
                errno: 0,
                data: data,
                message: message || responseStatus[0]
            }
        },
        refail: (message, data) => {
            return {
                errno: 1,
                data: data || null,
                message: message || responseStatus[1]
            }
        }
    }

    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = ctx.util.refail(err.message || responseStatus[1]);
        ctx.app.emit('error', err, ctx);
    }
};