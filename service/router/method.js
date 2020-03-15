const fs = require('fs');
const Labels = require('../db/Model/photo');
const { Op } = require('sequelize');



const addLabel = async ctx => { //新增  （图片上传可以用 koa-multer 中间件接收）
    let dataBuffer = Buffer.from(ctx.request.body.img, 'base64'); //new Buffer()已经弃用，改成Buffer.from
    let imgPath = 'D:/DataBase/images/'+new Date().getTime()+'.jpg';
    await fs.writeFile(imgPath, dataBuffer, err => {
        if(err) throw new Error('保存图片失败')
    });

    ctx.request.body.path = imgPath;
    await Labels.create(ctx.request.body);

    ctx.body = {
        retCode: 1
    }
};


const findLabel = async ctx => { //查找
    if(ctx.request.query) {
        ctx.state.labels = await Labels.findAll({ where: ctx.request.query })
    }else{
        ctx.state.labels = await Labels.findAll({raw: true})
    }

    ctx.body = {
        list: ctx.state.labels,
        retCode: 1
    }
};


const updateLabel = async ctx => { //更新
    await Labels.update(ctx.request.body, {
        where: {
            path: ctx.request.body.path
        }
    });
    let list = await Labels.findAll({raw: true});
    ctx.body = {
        retCode: 1,
        list
    }
};


const deleteLabel = async ctx => { //删除
    await Labels.destroy({
        where: {
            path: ctx.request.query.path
        }
    });  //注意： delete和get请求参数都在query
    fs.unlinkSync(ctx.request.query.path);
    ctx.body = {
        retCode: 1
    }

};


const exportDB = async ctx => { //导出数据
    //let list = await Labels.findAll({raw:true});
    let list = ctx.request.body.list;
    let str="Black_Hair,Eyeglasses,Heavy_Makeup,Mouth_Slightly_Open,"+
        "Wearing_Earrings,Wearing_Hat,Wearing_Lipstick,Wearing_Necklace,Wearing_Necktie,Disheveled_Hair,Ear_Blocked,EEyebrow_Blocked"+'\r\n';//需要写入的总数据
    for (let i = 0; i< list.length; i++) {
        console.log("数组取出的数据为："+JSON.stringify(list[i]));
        let dbStr = list[i].path+","+list[i].Black_Hair+","+list[i].Eyeglasses+","+list[i].Heavy_Makeup+","+list[i].Mouth_Slightly_Open+","+
            list[i].Wearing_Earrings+","+list[i].Wearing_Hat+","+list[i].Wearing_Lipstick+","+list[i].Wearing_Necklace+","+list[i].Wearing_Necktie+","+
            list[i].Disheveled_Hair+","+list[i].Ear_Blocked+","+list[i].Eyebrow_Blocked+'\r\n'
        str =str+dbStr;
    }


    fs.writeFileSync('D:/DataBase/data.txt', str);//将总数据写入指定的txt文件中

    ctx.body = {
        retCode: 1
    }
};


// 坑点： 这里只能用export 而且另外一边还得用require，好奇怪, (exports 好像被脚手架环境 改写了似的)
export {
    addLabel,
    findLabel,
    exportDB,
    deleteLabel,
    updateLabel,
}
