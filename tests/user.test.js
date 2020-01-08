const app = require('../index')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(app)

test('Add Valid Users', async () => {
    let result = await api.post('/')
                       .send({
                            "name": "jack",
                            "username": "jsoj",
                            "password": "somepass"
                        })
                        .expect(201)
})

test('Invalid Users', async () => {
    let result = await api.post('/')
        .send({
            "name": "ja",
            "username": "js",
            "password": "somepass"
        })
        .expect(403)
})
