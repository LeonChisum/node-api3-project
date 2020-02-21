const express = require("express");

const router = express.Router();

const userDb = require("./userDb");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  userDb
    .insert(body)
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not save user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  userDb
    .insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not save post" });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  userDb
    .getById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  userDb
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not retrieve user posts" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
    .then(num => {
      res.status(200)
      console.log(`You've deleted ${num} user(s)`)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not remove user" });
    });
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  // do your magic!
  userDb.update(req.params.id, req.body)
      .then(user => res.status(200).json(user))
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Could not update user" });
      });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;

  userDb
    .getById(id)
    .then(user => {
      if (user) {
        // attach value to my request
        req.user = user;

        // moving to next middleware in call stack
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Could not make request"
      });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = body.name;

  if (!body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = body.text;

  if (!body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
