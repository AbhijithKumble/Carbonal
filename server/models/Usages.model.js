  import mongoose from 'mongoose';
  const UsageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',unique:false },
    currentYear: { type: Number, required: true },
    currentMonth: { type: Number, required: true },
    electricityUnits:  { type: Number, required: false, default: 0 },
    fossilFuelCost:  { type: Number, required: false, default: 0 },
    meatFishKg:  { type: Number, required: false, default: 0 },
    petrolLitres:  { type: Number, required: false, default: 0 },
    dieselLitres:  { type: Number, required: false, default: 0 },
    phones:  { type: Number, required: false, default: 0 },
    laptopsDesktops:  { type: Number, required: false, default: 0 },
    otherGadgets:  { type: Number, required: false, default: 0 },
    footprint: { type: Number, required: false, default: 0 }
  });
  
  
 
  const Usages = mongoose.model('Usages', UsageSchema);
  export default Usages;
  