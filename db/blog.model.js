const {Schema, model, Types} = require('mongoose')

const blogSchema = new Schema ({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: Types.ObjectId, ref:'User', required:true },
  likes:{ type: Number,  default: 0 },
  dislikes:{ type: Number, default: 0 },
  comments:[{ type: Types.ObjectId, ref:'Comment' }],
  createdAt:{ type:Number, default: Date.now() },
  updatedAt:{ type:Number, default: Date.now() }
  
},)

const Blog = model('Blog', blogSchema);

module.exports = Blog;