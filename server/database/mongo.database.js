import { mongoose } from "mongoose";
import  dotenv  from 'dotenv';
import quotes from '../quotes.json'
dotenv.config();
const Quote=require('../models/Quotes.model');

const getUri = () => {
    let mongoUri = "";
  try {
    mongoUri = process.env.MONGODB_URI; 
    if (mongoUri == "" || mongoUri == undefined) {
      throw Error("env is empty");
    }
    return mongoUri;
  }catch(error) {
    throw error;
  }
};

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB =  async () => {
  let uri = "";
  try {
    uri = getUri();
  }catch(error) {
    console.log(error)
    throw Error("Unable to get the env of mongo")
  }

  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(error){
    console.log(error)
    throw Error("Unable to connect to the database ", error)
  }finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
    console.log("Disconnected from mongodb")
  }
};

export default connectDB;
