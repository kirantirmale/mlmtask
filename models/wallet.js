const mongoose = require('mongoose');

const wallet = new mongoose.Schema({
    
    userId: { type: String, required: true },
    ammount: { type: Number, required: true },
  
});

module.exports = mongoose.model('wallet', wallet);