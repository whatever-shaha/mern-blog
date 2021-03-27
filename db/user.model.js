const {Schema, Types, model} = require('mongoose');

const userShcema = new Schema({
  isAdmin: { type: Boolean, default: false },
  username: {
    type: String,
    unique:true,
    required:true
  },
  password: {
    type:String,
    required: true
  },
  blogs:[{type: Types.ObjectId, ref:'Blog' }],
  comments:[{type: Types.ObjectId, ref:'Comment' }],
  liked:[{type: Types.ObjectId, ref:'Blog' }],
  disliked:[{type: Types.ObjectId, ref:'Blog' }],
})

const User = model('User', userShcema)
module.exports = User;
