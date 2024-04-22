const Inventory= require('../model/inventoryschema.js') // Assuming your schema is defined in Product.js

// Controller function for handling POST request to create a new product
exports.createProduct = async (req, res) => {
    try {
        // Extracting data from request body
        const { name, category, quantity, price } = req.body;

        // Creating a new product instance
        const inventory = new Inventory({
            name,
            category,
            quantity,
            price
        });

        // Saving the product to the database
        await inventory.save();

        // Sending a success response
        res.status(201).json({ success: true, message: 'Product created successfully', data: inventory });
    } catch (error) {
        // Handling errors
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



exports.getProduct=async(req,res)=>{

    
        try{
        data = await Inventory.find()
      
        res.status(200).json({success:true,data});
        }
        catch(err){
            res.status(500).json({success:true,message:"Opps server error occured."});

        }
  

}