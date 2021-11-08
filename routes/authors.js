const router = require("express").Router();
const Author = require("../models/Author");
const { check, oneOf, validationResult } = require("express-validator");

const validatonRules = [check("name").exists()];

router.post("/", oneOf(validatonRules), async (req, res) => {
  try {
    validationResult(req).throw();

    const newAuthor = new Author(req.body);
    const author = await newAuthor.save();
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const author = await Author.find();
  res.json(author);
});

router.delete("/:id", async (req, res) => {
  try {
    await Author.deleteOne({ $set: { _id: req.body._id } });
    res.status(200).json("author deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Author.findByIdAndUpdate(req.params.id, {
      $set: { name: req.body.name },
    });
    res.status(200).json("author updated");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });
    if (!author) {
      res.status(404).json("author not found");
      return;
    }
    console.log(author);
    res.status(200).json(author.posts);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:id/post/:postId", async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });
    if (!author) {
      res.status(404).json("author not found");
      return;
    }
    const post = author.posts.find(
      (post) => post._id.toString() === req.params.postId
    );
    if (!post) {
      res.status(404).json("post not found");
      return;
    }
    console.log(post);
    console.log(author.posts);
    console.log(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
