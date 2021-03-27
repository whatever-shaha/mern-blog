const {Router} =  require('express');
const Blog = require('../db/blog.model');
const User = require('../db/user.model');
const router = Router()
const auth = require('../middleware/auth.middleware');

//   /api/blog
router.post('/', async (req,res) => { 
  try {
    const { id } = req.body; //id of the blog
    const blog = await Blog.findById(id).populate('author')
    res.status(200).json(blog)

  } catch (e) {
    res.status(500).json({msg: e.message})
    console.log(e.message);
  }
 })

//    /api/blog/Like
router.patch('/like', async (req, res) => { 
  try {
    const { id, userId } = req.body;
    const blog = await Blog.findById(id)
    const user = await User.findById(userId)
    if(!userId){
      return res.json({
        likes: blog.likes, 
        liked:false,
        dislikes: blog.dislikes,
        disliked:false
      })
    }
    const test = user.liked.includes(id)
    const testDis = user.disliked.includes(id)
    res.json({
      likes: blog.likes,
      liked:test,
      dislikes: blog.dislikes,
      disliked: testDis
    })

  } catch (e) {
    res.status(500).json({msg: e.message})
    console.log(e.message);
  }
})


router.post('/like', auth, async (req,res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id)
    const user = await User.findById(req.user.userId)
    const test = user.liked.includes(id)
    const testDis = user.disliked.includes(id)
    if(test){
      //removing like from blog and user models
      blog.likes--;
      user.liked.pull({_id:id})
      console.log('indluse', test);
    } else{
        if(testDis){
          blog.dislikes--;
          user.disliked.pull({_id:id})
        }
      //adding like from blog and user models
      blog.likes++;
      user.liked.push({_id:id});
      console.log('indluse', test);
    }

    await blog.save()
    await user.save()
    res.json({
      likes: blog.likes,
      liked:user.liked.includes(id),
      dislikes: blog.dislikes,
      disliked: user.disliked.includes(id)
    })

  } catch (e) {
    res.status(500).json({msg: e.message})
    console.log(e.message);
  }
})


router.post('/dislike', auth, async (req,res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id)
    const user = await User.findById(req.user.userId)
    const test = user.liked.includes(id)
    const testDis = user.disliked.includes(id)
    if(testDis){
      //removing dislike from blog and user models
      blog.dislikes--;
      user.disliked.pull({_id:id})
    } else{
      if(test) {
        blog.likes--;
        user.liked.pull({_id:id})
      }
      //adding dislike from blog and user models
      blog.dislikes++;
      user.disliked.push({_id:id});
    }
    await blog.save()
    await user.save()
    res.json({
      likes: blog.likes,
      liked:user.liked.includes(id),
      dislikes: blog.dislikes,
      disliked: user.disliked.includes(id)
    })

  } catch (e) {
    res.status(500).json({msg: e.message})
    console.log(e.message);
  }
})


//   /api/blog
router.delete('/', auth, async (req,res) => { 
  try {
    const {id}= req.body;
    await Blog.findByIdAndDelete(id)
    const user = await User.findById(req.user.userId).populate('blogs')
    await user.blogs.pull({_id:id});
    await user.save()
    res.status(202).json({msg: `blog with id ${id} id deleted` })
  } catch (e) {
    res.status(500).json({msg: e.message})
    console.log(e.message);
  }
})

module.exports = router