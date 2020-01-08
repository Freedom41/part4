
const errorHandler = (error, req, res, next) => {

    console.error(error.message)
    
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    } else {
        return response.status(401).jsons({
            error: error.message
        })
    }
    next(error)
}

/* const getToken = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7)
    }
} */

module.exports = {
    errorHandler,
   // getToken
}
