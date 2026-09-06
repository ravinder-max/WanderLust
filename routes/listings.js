const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressErrors.js");
const Listing = require("../models/listing.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const {isLoggedIn} = require("../middleware.js");
const {isOwner,validateListing}= require("../middleware.js");

const ListingController= require("../controllers/listing.js")
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
// listings routes


//Index route
router.get("/",wrapAsync(ListingController.index));

// new route
router.get("/new",isLoggedIn,ListingController.renderNewForm);

//Show route
router.get("/:id",wrapAsync(  ListingController.showListing));

//create  route 

router.post(
    "/",
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.createListing)
);
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.editFormRender));


router.put("/:id",isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(ListingController.updateListing));


// delete route 

router.delete("/:id",isLoggedIn,
    isOwner,
    wrapAsync( ListingController.deleteListing));

module.exports = router;