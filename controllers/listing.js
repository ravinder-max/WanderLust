const Listing = require("../models/listing");

module.exports.index =  async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{

    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  console.log(listing);
  res.render("listings/show.ejs", { 
    listing,
    mapToken: process.env.MAPTILER
});
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const key = process.env.MAPTILER;
  const location = req.body.location;

  const response = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${key}`
  );

  const data = await response.json();

  if (!data.features.length) {
    req.flash("error", "Invalid location");
    return res.redirect("/listings/new");
  }

  const coords = data.features[0].geometry.coordinates;

  const newListing = new Listing(req.body);

  newListing.owner = req.user._id;

  newListing.image = {
    url,
    filename
  };

  newListing.geometry = {
    type: "Point",
    coordinates: coords
  };

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};


module.exports.editFormRender =  async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested does not exist");
        return res.redirect('/listings');
    }
    
    res.render("./listings/edit.ejs",{listing});
};

module.exports.updateListing =  async (req,res)=>{
    let {id}=req.params;
    let listing =await Listing.findByIdAndUpdate(id, req.body);
    if(typeof req.file !=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing is edited");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findByIdAndDelete(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        return res.redirect('/listings');
    }
    req.flash("success","Listing  deleted");
    res.redirect("/listings");
};