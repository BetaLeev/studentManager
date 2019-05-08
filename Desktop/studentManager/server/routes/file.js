// 课程api
const fileController = require('../controller/files')
const apiFile = (router) => {
    router.post('/file', fileController.addFile);
    router.get('/file', fileController.getAllFile);
    router.delete('/file', fileController.removeFile);
    router.put('/file', fileController.modifyFile);
}

module.exports = apiFile