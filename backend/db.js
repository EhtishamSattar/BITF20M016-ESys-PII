const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
const mongooseURI='mongodb://127.0.0.1:27017/studentInterestsSystem';


mongoose.connect(mongooseURI)
  .then(() => console.log('Connected to mongoose!'));

const connectToMongoose=async ()=>{
    
    try {
    await mongoose.connect(mongooseURI);
    console.log("Connected to mongoose successfully");
  } catch (error) {
    console.error("Error connecting to mongoose:", error);
  }
}

module.exports=connectToMongoose;