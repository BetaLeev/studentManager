// const db = require('../../models/db/db')
const File = require('../../models/files')
var ObjectId = require('mongodb').ObjectID;

// 档案控制器
class FileController {
    static async getAllFile(ctx) {
        const r = await new Promise((res, rej) => {
            File.find((err, doc) => {
                if (err) {
                    rej(err);
                } else {
                    res(doc);
                    console.log(doc);
                }
            })
        })
        return ctx.body = r;
    }

    static async addFile(ctx) {
        console.log(ctx.request.body)
        let racial = ctx.request.body.racial;
        let origin = ctx.request.body.origin;
        let place = ctx.request.body.place;
        let city = ctx.request.body.city;
        let name = ctx.request.body.name
        let address = city + '-' + place;
        console.log(address)

        let add = new File({ "_id": new ObjectId(), 'racial': racial, 'origin': origin, 'name': name, 'address': address });
        add.save(err => {
            console.log(err)
        })
        ctx.body = { ok: true };

    }

    static async modifyFile(ctx) {
        let data = ctx.request.body.data;

        File.update({ _id: data._id }, { racial: data.racial, name: data.name, address: data.address, origin: data.origin }, { multi: true }, (err, res) => {
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

    static async removeFile(ctx) {
        console.log(ctx.request.body);
        let _id = ctx.request.body._id;
        console.log(_id);
        let remove = { '_id': _id };
        File.findByIdAndDelete(remove, (err, res) => {
            if (!err) {
                console.log(res)
            }
        })
        ctx.body = { ok: 200 }
    }
}

module.exports = FileController