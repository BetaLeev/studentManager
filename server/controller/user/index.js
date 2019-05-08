const User = require('../../models/user')
let MD5 = require('md5.js')

var ObjectId = require('mongodb').ObjectID;
class UserController {

    /**
     * 
     * @param {*} ctx 
     * @api {post} /user
     */
    static async addUser(ctx) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        }
        let email = formData.email;
        let name = formData.name;
        let password = formData.pwd;
        let md_password = await new MD5().update(password).digest('hex');

        let time = new Date();
        let add = new User({ "_id": new ObjectId(), 'email': email, 'name': name, 'password': md_password, 'createTime': time });
        await add.save().then((doc) => {
            console.log(doc)
            result.success = true;
            result.message = '注册成功'
        }).catch(err => {
            result.message = '注册失败'
        })
        ctx.body = result;


    }

    /**
     * 
     * @api {post} /login 
     */
    static async userLogin(ctx) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: {},
            code: ''
        }
        let email = formData.email;
        let password = formData.pwd;
        await User.findOne({ 'email': email }, (err, doc) => {
            if (err) {
                console.log(err)
                return
            } else {
                let md_password = new MD5().update(password).digest('hex');
                if (doc.password == md_password) {
                    result.data.name = doc.name;
                    result.success = true;
                    result.message = '登录成功'
                } else {
                    result.message = '登录失败'
                }
            }
        })
        ctx.body = result

    }
}


module.exports = UserController