const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, min: 3 },
    password: { type: String, required: true },
    name: { type: String, required: true },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {  
    transform: (doc, retdoc) => {
        retdoc.id = retdoc._id.toString()
        delete retdoc._id
        delete retdoc._v
        delete retdoc.password
    }
})

 const User = mongoose.model('User', userSchema)

 module.exports = User;