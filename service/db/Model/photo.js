const Sequelize = require('sequelize');
const db = require('./connect');

const Labels = db.define('Labels', {
    path: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
    },

    Black_Hair: Sequelize.INTEGER,  //黑发

    Eyeglasses: Sequelize.INTEGER,  //戴眼镜

    Heavy_Makeup: Sequelize.INTEGER, //浓妆

    Mouth_Slightly_Open: Sequelize.INTEGER, //露齿

    Wearing_Earrings: Sequelize.INTEGER, //带耳环

    Wearing_Hat: Sequelize.INTEGER,  //戴帽子

    Wearing_Lipstick: Sequelize.INTEGER,  //口红

    Wearing_Necklace: Sequelize.INTEGER,  //项链

    Wearing_Necktie: Sequelize.INTEGER,  //领带

    Disheveled_Hair: Sequelize.INTEGER,  //披发

    Ear_Blocked: Sequelize.INTEGER,  //遮耳

    Eyebrow_Blocked: Sequelize.INTEGER,  //遮眉

});

module.exports = Labels