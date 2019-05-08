        const userController = require('../controller/user')
        const apiUser = (router) => {
            router.post('/user', userController.addUser)
            router.post('/login', userController.userLogin)
        }

        module.exports = apiUser