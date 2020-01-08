const jwt = require('jsonwebtoken')
const blogRouter = require("express").Router()
const Blog = require('../models/blog')
const User = require('../models/users')

const getToken = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
}

blogRouter.get('/api/blogs', async (request, response, next) => {
    try {
    const users = await Blog
                    .find({})
                    .populate('user', { username: 1, name: 1 } , 'User',  )
                  
    response.json(users)
    } catch(err) {
        next(err)
    }

})

blogRouter.post('/api/blogs', async (request, response, next) => {

    const blog = new Blog(request.body)

    const token = getToken(request)

    const decodeToken = jwt.verify(token, process.env.SECRET) 

    try {
            if(!token || !decodeToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
            }
    } catch(err) {
        next(error)
    }

    let user = await User.findById(decodeToken.id)

    blog.user = user.id

    try {
        await blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
        }
        catch(error) {
                next(error)
        }
})

blogRouter.delete('/api/blogs/:id', async(req, res, next) => {
    let id = req.params.id;

    const token = getToken(req)

    const decodeToken = jwt.verify(token, process.env.SECRET) 

    let user = await User.findById(decodeToken.id)

    let userid = user._id.toString()

    try {
        if (!token || !decodeToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
    } catch (err) {
        next(error)
    }
    
    let blogid = await Blog.findById(id)

    console.log(blogid.user)
    console.log(userid)

    if (userid != blogid.user.toString()) {
        res.json('Acess denied, only users who own the blog may delete it')
    }
    else {
       try   {
           let del = await Blog.findByIdAndDelete(id, async (err,docs) => {
              if(docs) {
                 res.status(204).json('deleted')
             }
         })
     }
      catch(error) {
         next(error)
      } 
   }
})

blogRouter.put('/api/blogs/:id', async (req, res, next) => {
    let id = req.params.id;
    let likes = req.body.likes;
 
     try {
        let updt = await Blog.findByIdAndUpdate(id, likes, { new: true } , async (err, docs) => {
            if (docs) {
                res.status(203).json('updated')
            }
        })
    }
    catch (error) {
        next(error)
    } 
})


module.exports = blogRouter