let db = {
  users: {
    _Id: 'asdkfjie4ye0932',
    credentials: {
      email: 'whoa@whoa.com',
      password: '1234'
    },
    handle: 'user',
    createdAt: '2019-03-21T12:43:22.536Z',
    bio: {
      image: 'iaiehfa4i24240803thaf',
      bio: 'Derp',
      website: 'https://derp.com',
      location: 'Los Angeles, CA'
    },
    likes: [{
        userHandle: 'user',
        postId: 'ajhafihw4w3wfasd'
      },
      {
        userHandle: 'user',
        postId: '4259ufoiw4r09qr32'
      }
    ]
  },

  posts: [{
    userHandle: 'user',
    body: 'example text',
    createdAt: '2019-10-1T11:46:01.018Z',
    likeCount: 5,
    commentCount: 2
  }]

  comments: [{
    userHandle: 'user',
    postId: 'soaen445s3sdd',
    body: 'derp',
    createAt: '2019-12-12T6:32:22.634Z'
  }]
};