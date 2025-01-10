import mongoose, { model } from 'mongoose';

const Quotes=new mongoose.Schema({
    quote:{type:String }
});
const Quote=mongoose.model('Quote',Quotes);
export default Quote;