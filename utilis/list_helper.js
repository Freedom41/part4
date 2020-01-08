
const blog = (blogs) => {
    return 2;
}

let init = 0

const likes = (sumofliked) => {

    let sum = sumofliked.reduce((acc, ele) => acc + ele.likes, init)

    return sum
};

const favBlog = (blogs) => {

    let mostLiked = blogs.sort((acc, ele) => {
        return ele.likes - acc.likes
    })

    return mostLiked[0]
    
}
 
module.exports = {
    blog,
    likes,
    favBlog
}
