const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressErrors.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {validateReview}=require('../middleware.js');
const {isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");


router.post("/",isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

//delete a review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;