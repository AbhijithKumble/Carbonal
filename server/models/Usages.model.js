  import mongoose from 'mongoose';

  const UsagesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    electricityUnits: { type: Number },
    fossilFuelCost: { type: Number },
    meatFishKg: { type: Number },
    createdAt: { type: Date, default: Date.now },
    petrolLitres:{ type: Number },
    phones:{ type: Number },
    laptopsDesktops:{ type: Number },
    otherGadgets:{ type: Number },
    dieselLitres:{ type: Number },
  });

  const Usages = mongoose.model('Usages', UsagesSchema);
  export default Usages;