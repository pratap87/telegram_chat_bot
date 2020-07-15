const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, 
{ useNewUrlParser: true ,useUnifiedTopology: true}).catch(e => {
    console.error(e.message)
})

const Schema=mongoose.Schema;

const User=new Schema({
    name:{type:String},
     college:{type:String},
 sideproject:{type:String},
  lang:{type:[String]},
   frameworks:{type:String},
  projects:{type:String},
  confidence:{type:String},
  git:{type:String},
  level:{type:Number}
})

module.exports = mongoose.model('user', User)