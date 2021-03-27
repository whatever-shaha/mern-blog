const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()



const app = express()
const port = process.env.PORT || 5000;
//startins the server and connecting to the DB
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}
(async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('CONNECTED to mongoDB');
    app.listen(port, () => { console.log(`listening on port ${port}...`); }) 

  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})()

app.use(cors())
app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/create', require('./routes/create.routes'))
app.use('/api/blog', require('./routes/blog.routes'))

//it is for some bugs cases with '/blogs' and '/blogs/'
app.use('/api/latest', require('./routes/latest.routes'))
