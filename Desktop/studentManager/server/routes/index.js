module.exports = (router) => {
    router.get('/welcome', async function(ctx, next) {
        ctx.body = '111'
    })
}