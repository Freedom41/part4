const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('./utilis/config')
const mongoUrl = env.URI;
const port = env.PORT;
const mongoose = require('mongoose')
const router = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const errorhandler = require('./utilis/middleware').errorHandler
const jwebtkon = require('./utilis/middleware').getToken

mongoose.connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, poolSize: 4 })

app.use(cors())
app.use(bodyParser.json())
//app.use(jwebtkon)
app.use(router)
app.use(userRouter)
app.use(errorhandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app;