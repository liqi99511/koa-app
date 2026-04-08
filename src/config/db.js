// mysql
module.exports = {
    mysql_option: {
        database: 'inherit_user',
        account: 'root',
        password: 'LiQi990511@',
        options: {
            host: '127.0.0.1',
            port: 3306,
            dialect: 'mysql',
            logging: false,
            dialectOptions: {
                charset: 'utf8mb4',
                // collate: "utf8mb4_unicode_ci",
                supportBigNumbers: true,
            },
            define: {
                charset: 'utf8mb4',
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            timezone: '+08:00',
        }
    }
}