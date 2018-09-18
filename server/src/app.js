const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Post = require('../models/post')

mongoose.connect('mongodb://localhost:27017/posts', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', (callback) => {
  console.log('Connection Succeeded')
})

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Fetch all posts
app.get('/posts', (req, res) => {
  Post.find({}, 'title description', (error, posts) => {
    if (error) {
      console.error(error)
    }

    res.send({
      posts: posts
    })
  }).sort({_id: -1})
})

// Add new post
app.post('/posts', (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let newPost = new Post({
    title: title,
    description: description
  })

  newPost.save((error) => {
    if (error) {
      console.log(error)
    }

    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch single post
app.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (error, post) => {
    if (error) {
      console.error(error)
    }

    res.send(post)
  })
})

// Update a post
app.put('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (error, post) => {
    if (error) {
      console.error(error)
    }

    post.title = req.body.title
    post.description = req.body.description
    post.save((error) => {
      if (error) {
        console.log(error)
      }

      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/posts/:id', (req, res) => {
  Post.remove({
    _id: req.params.id
  }, (err, post) => {
    if (err) {
      res.send(err)
    }
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8081)
