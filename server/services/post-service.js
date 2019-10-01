const Post = require('./../models/post-model');
const ReadPreference = require('mongodb').ReadPreference;
const ObjectID = require('mongodb').ObjectID;

require('../mongo').connect();

getPosts = (req, res) => {
  const docquery = Post.find({}).sort({ createdAt : -1 }).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(docs => {
      res.json(docs);
    })
    .catch(err => console.error(err));
};

createPost = (req, res) => {
  const newPost = new Post();
  newPost.createdAt = new Date().toISOString();
  newPost.body = req.body.body;
  newPost.userHandle = req.body.userHandle;

  newPost
    .save()
    .then(doc => {
      res
        .status(201)
        .json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
};

module.exports = {
  getPosts,
  createPost
};
