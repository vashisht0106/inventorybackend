const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String, // Make sure password is defined as a String type
        required: false // Since you're generating it conditionally
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
