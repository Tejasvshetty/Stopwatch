const express = require("express");
const router = express.Router();
const watchController = require("../controllers/watchControl")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, watchController.getWatchFeed);

router.post("/createWatch", watchController.createWatch);

router.delete("/deleteWatch/:id", watchController.deleteWatch);

module.exports = router;
