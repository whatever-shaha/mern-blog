const {Router} =  require('express');
const User = require('../db/user.model');
const Blog = require('../db/blog.model');
const auth = require('../middleware/auth.middleware');
const router = Router()

router.post('/', auth, async (req,res) => { 
  try {
    const {title, body} = req.body;
    const author = req.user.userId
    await new Blog({ title, body, author }).save();
    const {_id} = await Blog.findOne({title, body})
    const user = await User.findById(author)
    user.blogs.push(_id)
    await user.save()
    res.status(201).json({id:_id})

  } catch (error) {
    res.status(500).json({msg: error.message, mss: 'create route'})
    console.log(error.message);
  }
})
 
router.post( '/edit', auth, async (req, res) => {
  try {
    const {title, body, _id} = req.body
    console.log(req.body);
    const blog = await Blog.findById(_id)
    blog.body = body;
    blog.title = title;
    blog.updatedAt = Date.now()
    await blog.save()
    res.json({msg: 'edited successfully'})
  } catch (e) {
    res.status(500).json({msg: e.message, mss: 'create route'})
    console.log(e.message);
  }
})

module.exports = router