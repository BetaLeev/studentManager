const db = require('../../models/db/db')
const Result = require('../../models/results')
var ObjectId = require('mongodb').ObjectID;

// 成绩控制器
class ResultController {

    /**
     * @api {get} /result
     * @param {*} ctx 
     */
    static async getAllResult(ctx) {
        let result = {
            success: false,
            message: '',
            data: {},
            code: ''
        }
        let resultDate = new Promise((res, rej) => {
            Result.find((err, doc) => {
                if (err) {
                    rej(err);
                } else {
                    res(doc);
                }
            })
        })
        await resultDate.then(res => {
            result.success = true;
            result.data = res;
        })
        return ctx.body = result
    }


    /**
     * @api {post} /result
     * @param {*} ctx 
     */
    static async addResult(ctx) {
        let result = {
            success: false,
            message: '',
            data: {},
            code: ''
        }
        let formData = ctx.request.body;
        let number = formData.number;
        let name = formData.name;
        let sex = formData.sex;
        let term = formData.term;
        let clas = formData.clas;
        let c = formData.c;
        let java = formData.java;
        let struct = formData.struct;
        let pc = formData.pc;
        let test = formData.test;
        let math1 = formData.math1;
        let math2 = formData.math2;
        let tag = formData.tag;
        let add = new Result({
            "_id": new ObjectId(),
            'number': number,
            'name': name,
            'sex': sex,
            'term': term,
            'clas': clas,
            'c': c,
            'java': java,
            'struct': struct,
            'pc': pc,
            'test': test,
            'math1': math1,
            'math2': math2,
            'tag': tag,
        });
        add.save(err => {
            if (err) {
                new Error(err);
                return
            } else {

            }
        })
        result.success = true;
        result.message = '添加成功'
        ctx.body = result

    }


    /**
     * @api {put} /result
     * @param {*} ctx 
     */
    static async modifyResult(ctx) {
        let result = {
            success: false,
            message: '',
            data: {},
            code: ''
        }
        let formData = ctx.request.body.data;
        let _id = formData._id;
        let number = formData.number;
        let name = formData.name;
        let sex = formData.sex;
        let term = formData.term;
        let clas = formData.clas;
        let c = formData.c;
        let java = formData.java;
        let struct = formData.struct;
        let pc = formData.pc;
        let test = formData.test;
        let math1 = formData.math1;
        let math2 = formData.math2;
        console.log(formData)
        await Result.update({ _id: _id }, { number: number, name: name, sex: sex, term: term, clas: clas, c: c, java: java, struct: struct, pc: pc, test: test, math1: math1, math2: math2 }, { multi: true }, (err, res) => {
            if (err) {
                new Error(err)
            } else {
                result.success = true;
                result.message = '修改成功';
            }

        })
        ctx.body = result;

    }
}


module.exports = ResultController