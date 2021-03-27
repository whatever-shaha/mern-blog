const {Router} =  require('express');
const Blog = require('../db/blog.model');
const User = require('../db/user.model')
const router = Router()

router.post('/', async (req,res) => { 
  const {filter, userId} = req.body
  let filterArg = {};
  if(filter === 'my'){
    filterArg = {author: userId}
  }
  try {
    if(filter === 'all' || filter === 'my'){
      const blogs = await Blog.find(filterArg, 
        ['title', 'body', 'createdAt', 'updatedAt', 'author', 'likes', 'dislikes'],
        {skip:0,limit:10,sort:{updatedAt:-1}}
      ).populate('author')
      return res.json(blogs)
    }
    const user = await User.findById(userId)
    const getBlogs = async () => { 
      // IF YOU HAVE TO AWAIT IN ITERATION ON MAP THE USE PROMISE.ALL!!!!!!!!!!!!!
      return Promise.all(user.liked.map(blog => Blog.findById(blog).populate('author')))
    }
    const blogs = await getBlogs()
    res.json(blogs)
  } catch (error) {
    res.status(500).json({msg: error.message})
    console.log(error.message);
  }
 })

module.exports = router