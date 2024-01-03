const Watch = require("../models/watch.js");

module.exports = {
  // getWatches: async (req, res) => {
  //   try {
  //     const watches = await Watch.find({ user: req.user.id });
  //     res.render("watches.ejs", { watches: watches, user: req.user }); 
  //   //Need to update the ejs for watches
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  getWatchFeed: async (req, res) => {
    try {
      const watches = await Watch.find().sort({ createdAt: "desc" }).lean();
      res.render("watches.ejs", { watches: watches });
    } catch (err) {
      console.log(err);
    }
  },
  // getWatch: async (req, res) => {
  //   try {
  //     const watch = await Watch.findById(req.params.id);
      // res.render("post.ejs", {watch: watch, user: req.user});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  createWatch: async (req, res) => {
    try {
      // Upload image to cloudinary
      await Watch.create({
        title: req.body.title,
        user: req.user.id,
      });
      console.log("Stopwatch has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deleteWatch: async (req, res) => {
    try {
      // Find post by id
      let watch = await Watch.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // Delete post from db
      await Watch.remove({ _id: req.params.id });
      console.log("Deleted Watch");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
