// 课程api
const teachController = require('../controller/teach')
const apiTeach = (router) => {
    router.post('/teach', teachController.addTeach);
    router.get('/teach', teachController.getAllTeach);
    router.delete('/teach', teachController.removeTeach);
    router.put('/teach', teachController.modifyTeach);

}

module.exports = apiTeach