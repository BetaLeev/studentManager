const db = require('../../models/db/db')
const Teach = require('../../models/teach')
var ObjectId = require('mongodb').ObjectID;

// 教学信息控制器
class TeachController {
    // 查询所有数据

    /**
     * 
     * @api {get} /teach 
     */
    static async getAllTeach(ctx) {
        let result = {
            success: false,
            message: '',
            data: {},
            code: ''
        }
        let resultData = new Promise((res, rej) => {
            Teach.find((err, doc) => {
                if (err) {
                    rej(err);
                } else {
                    res(doc);
                }
            })
        })
        await resultData.then(doc => {
            result.data = doc;
            result.success = true;
        })

        return ctx.body = result



    }

    // 添加教学信息
    static async addTeach(ctx) {
        let number = ctx.request.body.number;
        let course = ctx.request.body.course;
        let date = ctx.request.body.date;
        let count = ctx.request.body.count;
        let teacher = ctx.request.body.teacher
        let add = new Teach({ "_id": new ObjectId(), 'number': number, 'course': course, 'date': date, 'teacher': teacher, 'count': count });
        add.save(err => {
            console.log(err)
        })
        ctx.body = { ok: true };
    }

    static async modifyTeach(ctx) {
        let _id = ctx.request.body.form._id;
        console.log(_id)

        let form = ctx.request.body.form;
        console.log(form);

        Teach.update({ _id: _id }, { number: form.number, course: form.course, count: form.count, date: form.date, teacher: form.teacher }, { multi: true }, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                if (res) {
                    console.log(res);
                }
            }
        })

        ctx.body = { ok: true }
    }


    // 删除
    static async removeTeach(ctx) {
        let number = ctx.request.body.number;
        console.log(number);
        let remove = { 'number': number };
        Teach.findOneAndDelete(remove, (err, res) => {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        })
        ctx.body = { ok: true };
    }
}

module.exports = TeachController