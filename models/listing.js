const mongoose = require('mongoose');
const Reviews = require('./reviews');
const schema = mongoose.Schema;

const listingSchema = new schema({
    title:{
        type :String,
        required :true,
},
    description:String,
    image : {
        url: String,
        filename:String,
       
    },
    price: Number,
    location: String,
    country : String,
    reviews :[{
        type: schema.Types.ObjectId,
        ref:"Review"
    }],
    geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  }, 

    owner:{
        type : schema.Types.ObjectId,
        ref:"User"
    }

});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Reviews.deleteMany({_id : {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
