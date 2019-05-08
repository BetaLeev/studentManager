// 成绩api
const resultController = require('../controller/results')
const apiResult = (router) => {
    router.post('/result', resultController.addResult);
    router.get('/result', resultController.getAllResult);
    router.put('/result', resultController.modifyResult);

}

module.exports = apiResult