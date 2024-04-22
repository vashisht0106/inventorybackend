//creating server using express and connecting it to mongoDB database

// const express = require("express");
// const mongoose = require ("mongoose")
// const cors = require("cors");
// const porduct=require('./route/ProductRoute')
// const dotenv=require('dotenv')
// dotenv.config()
//const { MongoClient} = require("mongodb");
// const path = require("path");



// const port = process.env.PORT || 5000;








mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { console.log("database connected successfully done") })

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use(porduct)




//api to get all items
//app.get("/inventory", async (req, res) => {
//  try{
//  response = await collection.find({}).toArray();

//  res.send(response);
//  }
//  catch(err){
//    console.log(err);
//  }
//});




//api to get single item
app.get("/inventory/:id", async (req, res) => {
  const {id}=req.params;
  response = await collection.find({_id:new mongodb.ObjectId(id)}).toArray();

  res.send(response);
});

//api to add item

//app.post("/inventory", async (req, res) => {
//  const { name, category, quantity,price } = req.body;
//  await collection.insertOne({
//    name: name,
//    category: category,
//    quantity: quantity,
//    price:price,
//    status:pending
//  });
//  res.status(200);
//  res.send("Item Added Successfully");
//});

//api to update item
app.put("/inventory/:id",async(req,res)=>{
  const { name, category, quantity,price } = req.body;
  const {id}=req.params; 
  await collection.updateOne({_id:new mongodb.ObjectId(id)},{$set:{name:name,category:category,quantity:quantity,price:price}});
  res.status(200);
  res.send("Item Updated Successfully");
})




//api to delete item

app.delete("/inventory/:id", async (req, res) => {
  const { id } = req.params;
  
  
  await collection.deleteOne({_id:new mongodb.ObjectId(id)})
  res.status(200);
  res.send("Item Deleted Successfully");
});



app.listen(port,() => {
  console.log(`Server is running on ${port}`);
});



