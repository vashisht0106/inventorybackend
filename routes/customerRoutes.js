const express = require('express');
const router = express.Router();
const Customer= require('../model/customerSchema.js')





// Get all customers
router.get("/read_customers", async (req, res) => {
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// Get customers by status
router.get("/read_customers", async (req, res) => {
  const { date } = req.query;
  try {
      let customers;
      if (date) {
          customers = await Customer.find({ date });
      } else {
          customers = await Customer.find();
      }
      res.json(customers);
  } catch (error) {
      console.error("Error fetching customers:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});



  // Add a customer
  router.post("/add_customer", async (req, res) => {
    const { 
      date,
      srno,
      companyName,
      address: { office, city, state },
      customerName,
      customerNumber,
      email,
      businessCategory,
      requiredItem,
      requiredQuantity,
      productSpecific,
      orderValue,
      feasibility,
      quotationSubmissionDate,
      followingResult,
      status
    } = req.body;
    
    try {
      const newCustomer = new Customer({
        date,
        srno,
        companyName,
        address: {
          office,
          city,
          state
        },
        customerName,
        customerNumber,
        email,
        businessCategory,
        requiredItem,
        requiredQuantity,
        productSpecific,
        orderValue,
        feasibility,
        quotationSubmissionDate,
        followingResult,
        status
      });
  
      await newCustomer.save();
      res.status(201).json({ message: "Customer added successfully" });
    } catch (error) {
      console.error("Error adding customer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  // Delete a customer
  router.delete("/delete_customer/:id", async (req, res) => {
    const customerId = req.params.id;
    try {
      await Customer.findByIdAndDelete(customerId);
      res.json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error("Error deleting customer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Update a customer
  router.put("/update_customer/:id", async (req, res) => {
    const customerId = req.params.id;
    const { name,email, contact, discussion, nextFollowUpDate } = req.body;
    try {
      await Customer.findByIdAndUpdate(customerId, {
        name,
        email,
        contact,
        discussion,
        nextFollowUpDate,
      });
      res.json({ message: "Customer updated successfully" });
    } catch (error) {
      console.error("Error updating customer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });




  module.exports = router;