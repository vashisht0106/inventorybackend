const mongoose = require('mongoose');



// / Define Inventory Schema
const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
category: {
    type: String,
    required: true
},
quantity: {
    type: Number,
    required: true
},
price: {
    type: Number,
    required: true
},
status: {
    type: String,
    enum: ['pending', 'completed'], // assuming 'pending' is one of the statuses
    default: 'pending' // default value for status
}
});

module.exports = mongoose.model('Inventory', inventorySchema);