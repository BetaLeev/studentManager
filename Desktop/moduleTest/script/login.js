function wxAuth() {
    return new Promise(function (resolve, reject) {
        var wxPlus = api.require("wxPlus");
        wxPlus.auth({
            apiKey: 'wxf476d7072eeddaae'
        }, function (ret, err) {
            if (err) {
                reject(err)
            } else {
                resolve(ret)
            }
        })
    })
}
