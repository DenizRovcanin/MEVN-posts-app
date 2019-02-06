const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts', { useNewUrlParser: true });
const db = mongoose.connection;

const Post = require('../db/models/posts');

db.on('error', console.error.bind(console, 'Database connection error'));
db.once('open', (cb) => {
    console.log('Database connection successful')
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 8081);

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', (error, posts) => {
    if(error) {
      console.log(error);
        res.status(500).send({
          success: false,
          message: 'Cannot get posts',
        })
    }
    res.send({
      posts,
    })
  }).sort({_id: -1});

});

app.post('/posts', (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let newPost = new Post({
    title,
    description,
  });

  newPost.save((error) => {
    if(error) {
      console.log(error);
        res.status(500).send({
          success: false,
          message: 'Cannot save post',
        })
    }

    res.send({
      success: true,
      message: "Post saved successfully",
    })
  })
});

app.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (error, post) => {
    if(error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Cannot get post',
      })
    }
    res.send(post);
  })
});

app.put('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', (error, post) => {
   if(error) {
     console.log(error);
     res.status(500).send({
       success: false,
       message: 'Cannot update post',
     })
   }
   post.title = req.body.title;
   post.description = req.body.description;
   post.save((error) => {
     if(error) {
       console.log(error);
     }
     res.send({
       success: true,
     })
   })
  })
});

app.delete('/posts/:id', (req, res) => {
  Post.remove({
    _id: req.params.id,
  }, function(error, post) {
    if(error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Cannot delete post',
      })
    }
    res.send({
      success: true,
    })
  })
});
