const mogo =require('mongoose');

const schema = new mongo.Schema({
    city:{type:String},
    country: { type: String },
    rent: {type: Number},
    bedroom: {type: Number},
},{timestamps:true});





module.exports=mongo.model('listing', schema);
