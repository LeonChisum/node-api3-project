module.exports = () => (req, res, next) => {
    const {method, url} = req
    const timestamp = Date.now()

    console.log(`${method} ${url} ${timestamp}`)
    next()
}