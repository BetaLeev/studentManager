// 考试安排api
const examController = require('../controller/exam')
const ApiExam = (router) => {
    router.post('/exam', examController.addExam);
    router.get('/exam', examController.getAllExam);
    router.delete('/exam', examController.removeExam);
    router.put('/exam', examController.modifyExam);

}

module.exports = ApiExam