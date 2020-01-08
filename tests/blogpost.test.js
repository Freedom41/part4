const app = require('../index')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

test('list of all blogs', async () => {
  let result = await api.get('/api/blogs')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)

    blog = result.body
})

test('_id is named id', async () => {

    let blog = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blog.body[0].id).toBeDefined()
})

test('blog created', async () => {
    let blog = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    let count = blog.body.length + 1;

    let newBlog = {
        "title": "Some Blog",
        "author": "Some author",
        "url": "Some URL",
        "likes": 12
    }
    let result = await api.post('/api/blogs')
                          .send(newBlog)
                          .expect(201)
                          .expect('Content-Type', /application\/json/)

    expect(result.body).toBeDefined()

    let bloglist = await api.get('/api/blogs');

    expect(count).toBe(bloglist.body.length)

})

test('default like val', async () => {

    let newBlog = {
        "title": "Some Blog",
        "author": "Some author",
        "url": "Some URL"
    }

    let result = await api.post('/api/blogs')
                          .send(newBlog)
                          .expect(201)
                          .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBe(0)
})

test('valid fields', async () => {

    let newBlog = {
        "author": "Some author",
        "likes": 12
    }

    let result = await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
})

test('deleted', async () => {

    let blog = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    let blogtodel = blog.body[0]

    let count = blog.body.length - 1;

    let result = await api.delete(`/api/blogs/${blogtodel.id}`)
                          .expect(204)

    blog = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blog.body.length).toEqual(count)
})

test('updated', async () => {

    let blog = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)  
    
    let blogtoUp = blog.body[0]

    blogtoUp.likes += 1;

    let result = await api.put(`/api/blogs/${blogtoUp.id}`)
                          .send({likes: blogtoUp})
    console.log(result.body)

})

afterAll(() => {
    mongoose.connection.close()
})