const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
});

exports.Order = mongoose.model('User', userSchema);