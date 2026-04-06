const express = require("express")
const router  = express.Router({mergeParams:true})
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const Review = require("../models/review.js")
const {validatereview,IsloggedIn, isReviewAuthor} = require("../middleware.js")

const reviewcontroller = require("../controllers/reviews.js")

// review rout

router.post("/",IsloggedIn,validatereview,wrapAsync(reviewcontroller.createReview))

// delete review rout

router.delete("/:reviewid", IsloggedIn,isReviewAuthor,wrapAsync(reviewcontroller.DestroyReview));

module.exports = router;