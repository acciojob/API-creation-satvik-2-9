const express = require('express');
const app = express();

// Sample posts
const posts = [
  {
    id: '1',
    title: 'First post',
    content: 'This is the first post.',
    tags: ['tag1', 'tag2']
  },
  {
    id: '2',
    title: 'Second post',
    content: 'This is the second post.',
    tags: ['tag2', 'tag3']
  }
];

app.get('/posts', (req, res) => {
  const tags = req.query.tags ? req.query.tags.split(',') : [];
  //console.log(tags);
  if (tags.length === 0) {
    return res.status(400).json({ error: 'No tags provided' });
  }

  const filteredPosts = posts.filter(post => 
    post.tags.some(tag => tags.includes(tag))
  );
  //console.log(filteredPosts);
  return res.status(200).json(filteredPosts);
});

const PORT = process.env.PORT || 3000;

// Only start the server if the file is run directly from the command line
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // Export for testing purposes
