const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',  //sqlite3  >4.0版本就不是这样配置了
    storage: 'D:/DataBase/lib.db'
});

db.sync();

db.authenticate()
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(err => {
        console.error('数据库连接失败', err)
    });

module.exports = db
