const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");


main()
.then(()=>
    {console.log("connecting successful to DB")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
};


const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6a87ed2b307b4f043db1ff88"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initlized");
}

initDB();