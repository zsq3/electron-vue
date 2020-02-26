import fs from 'fs'
import path from 'path'



function mkdir(filePath) {
    if (fs.existsSync(filePath)) {
        return true
    }else{
        if(mkdir(path.dirname(filePath))){
            fs.mkdirSync(filePath);
            return true
        }
    }
}


function notify(message, type, t, path){
    return t.$notify({
        title: '提示',
        message,
        type,
        offset: 200,
        duration: 5000, //默认4500ms
        onClose: () => {
            path && t.$router.replace({name: path})
        }
    })
}


function initParams() {
    return new Promise((resolve, reject) => {
        let params = fs.readFileSync('D:/Tool2020/resources/app/config/tag.json', 'utf-8'); //path.join(__static,'../config/tag.json'
        params = JSON.parse(params);
        for(let key in params){
            params[key] = 0;
        }
        resolve(params)
    })
}


export {
    notify,
    mkdir,
    initParams
}