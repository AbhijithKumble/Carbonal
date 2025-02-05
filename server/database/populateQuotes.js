// populateQuotes.js
import mongoose from 'mongoose';
import Quote from './models/Quotes.model.js';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB URI
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(async () => {
    // console.log('Connected to MongoDB!');
    
    // Example quotes
    const quotes =[
      { "quote": "We cannot solve our problems with the same thinking we used when we created them." },
      { "quote": "Saving our planet, lifting people out of poverty, advancing economic growth... these are one and the same fight." },
      { "quote": "The future of humanity and indeed all life on Earth depends on us." },
      { "quote": "What you do makes a difference, and you have to decide what kind of difference you want to make." },
      { "quote": "Mother Nature has been abused, the powers have been abused, this is the abuse. And we all stand accountable." },
      { "quote": "We are the first generation to feel the effect of climate change and the last generation who can do something about it." },
      { "quote": "The best way to predict the future is to invent it." },
      { "quote": "You are never too small to make a difference." },
      { "quote": "In nature, nothing exists alone." },
      { "quote": "Destroying rainforest for economic gain is like burning a Renaissance painting to cook a meal." },
      { "quote": "We do not inherit the Earth from our ancestors, we borrow it from our children." },
      { "quote": "Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it's the only thing that ever has." },
      { "quote": "Climate change is real. It is happening right now. It is the most urgent threat facing our entire species." },
      { "quote": "The creation of a thousand forests is in one acorn." },
      { "quote": "What is the use of a house if you haven't got a tolerable planet to put it on?" },
      { "quote": "The Earth, our home, is beginning to look more and more like an immense pile of filth." },
      { "quote": "The climate crisis is not a political issue; it is a moral and spiritual challenge to all of humanity." },
      { "quote": "Sustainability is the motherlode of innovation." },
      { "quote": "Water and air, the two essential fluids on which all life depends, have become global garbage cans." },
      { "quote": "Alone we can do so little; together we can do so much." }
    ];
    

    // Insert the quotes into the Quotes collection
    await Quote.insertMany(quotes);
    // console.log('Quotes populated!');
    process.exit(0); // Exit the process after population
  })
  .catch(err => {
    console.error('Error connecting to MongoDB or populating quotes:', err);
    process.exit(1); // Exit the process if error occurs
  });
