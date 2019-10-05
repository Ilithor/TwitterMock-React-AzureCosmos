const { getList, create } = require('../services/post.service');

// Retrieves a list of posts
exports.getPostList = (req, res, next) => {
  getList()
    // Retrieves a list of posts, and
    // populates them in an array
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push({
          postId: doc.id,
          body: doc.body,
          userHandle: doc.userHandle,
          createdAt: doc.createdAt,
          commentCount: doc.commentCount,
          likeCount: doc.likeCount
        });
      });
      // Returns list of posts in array
      return res.json(posts);
    })
    .catch(err => console.error(err));
};

// Makes one post
exports.createPost = (req, res, next) => {
  let id;
  create(req.body)
    .then(data => {
      // If no id, function returned with
      // validation errors
      if (data.id === undefined) {
        return res.status(400).json({ error: data });
      } else {
        id = data.id;
      }
    })
    .then(() => {
      if (id) {
        return res
          .status(201)
          .json({ message: `document ${id} created successfully` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
