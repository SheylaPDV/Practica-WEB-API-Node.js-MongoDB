function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('resultado');
            reject(new Error('he fallado'))
        }, ms)
    })
}
module.exports = {
    sleep
}