const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All Authors Route

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find({});
    res.render('authors/index', { authors: authors });
  } catch {
    console.log('error')
    res.redirect('/');
  };
})

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
})

// Create Author Route
router.post('/', async (req, res) => {
  
  const author = new Author({
    name: req.body.name
  })
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch {
    console.error('Error');
    res.render("authors/new", {
        author: author,
        errorMessage: "Error Creating Author"
    })
  };

  /* const author = new Author({
    name: req.body.name
  })
  author.save((err, newAuthor) => {
    if (err) {
      let locals = {errorMessage: "Error Creating Author"};
      res.render("authors/new", {
          author: author,
          locals: locals
      })
    } else {
      // res.redirect(`authors/${newAuthor.id}`);
      res.redirect(`authors`);
    }
  }) */
})

module.exports = router;