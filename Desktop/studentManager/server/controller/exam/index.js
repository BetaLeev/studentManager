// const db = require('../../models/db/db')
const Exam = require('../../models/exam')
const ObjectId = require('mongodb').ObjectID;

// 考试控制器
class ExamController {
    static async getAllExam(ctx) {
        const r = await new Promise((res, rej) => {
            Exam.find((err, doc) => {
                if (err) {
                    rej(err);
                } else {
                    res(doc);
                }
            })
        })
        return ctx.body = r;
    }

    static async addExam(ctx) {
        console.log(ctx.request.body)
        let date1 = ctx.request.body.date1;
        let date2 = ctx.request.body.date2;
        let course = ctx.request.body.course;
        let place = ctx.request.body.place;
        let open = ctx.request.body.type;
        let type = false;
        if (open == 1) {
            type = true
        }
        let time = date1 + ' ' + date2;
        let add = new Exam({ "_id": new ObjectId(), 'time': time, 'course': course, 'open': type, 'place': place });
        add.save(err => {
            console.log(err)
        })
        ctx.body = { ok: true };
    }

    // 删除考试
    static async removeExam(ctx) {
        console.log(ctx.request.body);
        let _id = ctx.request.body._id;
        console.log(_id);
        let remove = { '_id': _id };
        Exam.findByIdAndDelete(remove, (err, res) => {
            if (!err) {
                console.log(res)
            }
        })
        ctx.body = { ok: 200 }
    }

    // 修改考试
    static async modifyExam(ctx) {
        let data = ctx.request.body.data;
        console.log(data)

        Exam.update({ _id: data._id }, { time: data.time, course: data.course, open: data.open, place: data.place }, { multi: true }, (err, res) => {
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

}

module.exports = ExamController