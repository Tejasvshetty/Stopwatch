const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getClocks: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("clocks.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      // const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      const posts = await Post.find({ user: req.user.id });
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      if(req.body.title != ""){
        // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);
      await Post.create({
        title: req.body.title,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        // caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        hour: "00",
        minute: "00",
        second: "00",
        count: "00"
      });
      }
      console.log("Post has been added!");
      res.redirect("/clocks");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/clocks");
    } catch (err) {
      res.redirect("/clocks");
    }
  },
  updateTime: async(req, res) => {
    try{
      console.log("we are here")
      await Post.findOneAndUpdate({_id: req.body.timerId},{
        hour: req.body.hourUpdate,
        minute: req.body.minuteUpdate,
        second: req.body.secondUpdate,
        count: req.body.countUpdate
      });
      res.json('Marked Complete')
    } catch (err){
      console.log(err)
    }
  },
  updateStart: async(req, res) => {
    try{
      await Post.findOneAndUpdate({_id: req.body.timerId},{
        timeStart: req.body.startTime,
      });
      res.json('Marked Complete')
    } catch (err){
      console.log(err)
    }
  },

  getStart: async(req, res) => {
    try {
      // Use await to wait for the findOne operation to complete
      const post = await Post.findOne({ _id: req.params.id });
      // Check if the post is found before responding
      if (post) {
        res.json(post);
      } else {
        // Handle the case where the post is not found
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (err) {
      // Handle any errors that may occur during the operation
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },





};
