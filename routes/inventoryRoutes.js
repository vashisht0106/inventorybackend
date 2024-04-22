const express = require('express');
const router = express.Router();
const Inventory= require('../model/inventoryschema.js')

// Read (SELECT)
router.get('/read', async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.send(inventory);
    } catch (error) {
      console.error('Error reading inventory:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Create (INSERT)
  router.post('/create', async (req, res) => {
    try {
      const { name, category, quantity, price ,status} = req.body;
      const inventory = new Inventory({ name, category, quantity, price,status });
      await inventory.save();
      res.send('Inventory added to database');
    } catch (error) {
      console.error('Error creating inventory:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Update (PUT)
  router.put('/update/:id', async (req, res) => {
    try {
      const { name, category, quantity, price, status } = req.body;
      const updateInventory = await Inventory.findByIdAndUpdate(req.params.id,{ name, category, quantity, price, status }, { new: true });
      res.status(200).json(updateInventory);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
  });
  
  
  
  // Delete (DELETE)
  router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await Inventory.findByIdAndDelete(id);
      res.send('Inventory deleted');
    } catch (error) {
      console.error('Error deleting inventory:', error);
      res.status(500).send('Internal Server Error');
    }
  });





  
  module.exports = router;