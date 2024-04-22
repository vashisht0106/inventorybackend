const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventoryRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const customerRoutes = require('./routes/customerRoutes');
// const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const router = express.Router(); 



app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());




router.use('/api', inventoryRoutes);
router.use('/api', departmentRoutes);
router.use('/api', customerRoutes);

// router.use('/api', authRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Company').then(() => {
    console.log('database connected');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});




// Use the router middleware
app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
