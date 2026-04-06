const Review = require("../models/review")
const Listing = require("../models/listing")

module.exports.createReview = async (req,res,next)=>{
  let listing = await Listing.findById(req.params.id)
  let newreview = new Review(req.body.review)
  newreview.author = req.user._id
  console.log(newreview)
  listing.reviews.push(newreview);

  await newreview.save(); 
  await listing.save();
  req.flash("success","New review created!")
  res.redirect(`/listings/${listing._id}`)
}

module.exports.DestroyReview = async (req, res, next) => {
  let { id, reviewid } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
  await Review.findByIdAndDelete(reviewid);
  
  req.flash("success","Review Deleted!")
  res.redirect(`/listings/${id}`);
}