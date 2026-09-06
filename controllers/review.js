const Review = require("../models/reviews.js");
const Listing=require("../models/listing.js");
module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review was saved");
    req.flash("success","Review is created");
    res.redirect(`/listings/${listing.id}`)

};

module.exports.deleteReview= async(req,res)=>{
    let {id,reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id , {$pull :{reviews:reviewId}});
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};