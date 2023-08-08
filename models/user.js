const mongoose = require('mongoose');

const user = new mongoose.Schema({
    
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userid: { type: String, required: true },
    role: { type: String, default:"user" },
    coupon: { type: String, required: true},
    sponsorCode: { type: String, required: true}
});

module.exports = mongoose.model('user', user);