const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  date: String, 
  srno:Number,
  companyName: String, 
  address: {
    office: String, 
    city: String, 
    state: String 
  },
  customerName: String, 
  customerNumber: Number,
  email: String,
  businessCategory: String, 
  requiredItem: String, 
  requiredQuantity: String, 
  productSpecific: String, 
  orderValue: String, 
  feasibility: String, 
  quotationSubmissionDate: Date, 
  followingResult: String, 
  status:{ type: String, default: "pending"
}
  });
  
  module.exports = mongoose.model("Customer", customerSchema);