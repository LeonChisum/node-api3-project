const express = require('express');

const postDb = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve posts" });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb
    .getById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve post" });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb
  .remove(req.params.id)
  .then(num => {
    res.status(200);
    console.log(`You've deleted ${num} post(s)`);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Could not remove post" });
  });
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  postDb
  .update(req.params.id, req.post)
  .then(post => res.status(200).json(post))
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "Could not update post" });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  postDb
    .getById(id)
    .then(post => {
      if (post) {
        // attach value to my request
        req.post = post;

        // moving to next middleware in call stack
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Could not make request"
      });
    });
}

module.exports = router;
