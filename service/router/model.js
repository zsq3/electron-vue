const Router = require('koa-router');
const middleWare = require('./method');
const router = new Router({prefix: '/api'});

router.post('/addLabel', middleWare.addLabel);

router.post('/exportDB', middleWare.exportDB);

router.get('/findLabel', middleWare.findLabel);

router.delete('/deleteLabel', middleWare.deleteLabel);

router.post('/updateLabel', middleWare.updateLabel);


module.exports = router