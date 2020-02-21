const express = require("express")

const logger = require('./middleware/logger') //importing my logger middleware

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express()
const port = process.env.PORT || 4000

server.use(logger())

server.use("/", (req, res) => {
    res.json({ message: "Welcome to Leon's Api" })
})
server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

server.use((req, res) => {
    res.status(400).json({ message: "no route found" })
})

server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})