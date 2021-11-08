const router = require("express").Router();
const Author = require("../models/Author");
// const uuid = require("uuid");
// const auth = require("../db");

router.post("/", async (req, res) => {
  try {
    const newAuthor = new Author({
      name: req.body.name,
    });

    const author = await newAuthor.save();
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json(error);
  }
});

// //get authors
// router.get("/", async (req, res) => {
//   res.json(auth);
// });

// //add authors

// router.post("/", (req, res) => {
//   const newAuthor = {
//     id: uuid.v4(),
//     name: req.body.name,
//     posts: [],
//   };

//   if (!newAuthor.name) {
//     return res.status(400).json({ msg: "Please enter a name" });
//   }

//   auth.push(newAuthor);
//   res.json(auth);
// });

//update author

module.exports = router;
