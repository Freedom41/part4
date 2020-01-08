const env = require('dotenv').config()

let URI = process.env.DB;
let PORT = process.env.PORT;

if (process.env.NODE_ENV === 'test') {
    URI = process.env.TEST_DB
}

module.exports = {
    URI,
    PORT
}