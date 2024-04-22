
const Department= require('../model/deparmentSchema.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;





// Register department endpoint
router.post('/register', async (req, res) => {
    try {
        const { name, email, department, password } = req.body;

        // Check if departmentName or email already exist
        const existingDepartment = await Department.findOne({ $or: [{ department }, { email }] });
        if (existingDepartment) {
            return res.status(400).json({ message: 'Department name or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new department
        const newDepartment = new Department({ name, email, department, password:hashedPassword });
        await newDepartment.save();

        res.status(201).json({ message: 'Department registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Assuming email is used as the username
    async (email, password, done) => {
        try {
            // Find the department in the database by email
            const department = await Department.findOne({ email });
            if (!department) {
                return done(null, false, { message: 'Department not found' });
            }

            // Verify the password
            const isValidPassword = await bcrypt.compare(password, department.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'Invalid password' });
            }

            // If authentication succeeds, return the department
            return done(null, department);
        } catch (error) {
            return done(error);
        }
    }
));




// Login endpoint
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    try {
        // If authentication succeeds, generate a JWT token
        const token = jwt.sign({ email: req.user.email }, 'your_secret_key', { expiresIn: '1h' });
        
        // Set the token as a cookie in the response
        res.cookie('jwtoken', token, { httpOnly: true, sameSite: 'lax', maxAge: 3600000 });
        console.log(token)
        
        // Return success message along with token and department details
        res.status(200).json({ success: true, message: 'Login successful', token, department: req.user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});












router.get('/read_employee',  async (req,res)=>{

    try {
        const employee = await Department.find()
        res.send(employee)
        
    } catch (error) {
        console.error('Error reading employee:', error);
        res.status(500).send('Internal Server Error');
        
    }

} )



// Add employee endpoint
router.post('/add_employee', async (req, res) => {
    try {
        const { name, email, department } = req.body;
        
        // Generate random password
        const password = generatePassword();

        console.log("Generated Password:", password);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // Create a new employee instance
        const employee = new Department({ name, email, department, password: hashedPassword });

        // Save the employee to the database
        await employee.save();

        // Send response with success message and password
        res.send({ message: 'Employee added to database', password });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Function to generate a random 6-digit numeric password
function generatePassword() {
    const length = 6;
    let password = '';
    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10);
        password += digit.toString(); 
    }
    return password;
}

// Update employee
router.put('/update_employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, department } = req.body;
        const updatedEmployee = await Department.findByIdAndUpdate(id, { name, email, department }, { new: true });
        res.send('Employee updated successfully');
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete employee
router.delete('/delete_employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Department.findByIdAndDelete(id);
        res.send('Employee deleted successfully');
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).send('Internal Server Error');
    }
});





router.get('/loaduser',(req,res)=>{

const {jwtoken}=req.cookies
console.log(jwtoken)


})




















module.exports = router;