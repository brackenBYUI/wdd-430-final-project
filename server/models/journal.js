const mongoose = require('mongoose');

const entrieSchema = mongoose.Schema({
   date: { type: Date, default: Date.now },
   content: { type: String, required: true },
});

module.exports = mongoose.model('Entrie', entrieSchema);