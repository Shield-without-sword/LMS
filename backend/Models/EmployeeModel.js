const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
    },
    Defect: {
        type: String,
    },
    Weight: {
        type: String,
    },
    Breed: {
        type: String,
    },
    profileImage: {
        type: String
    },
    Age: {
        type: Number,
    },
    production: [
        {
            date: {
                type: Date,
     
            },
            amount: {
                type: Number,
          
            }
        }
    ],
    scale: {
        type: String,
        default: "liter/amount"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
module.exports = EmployeeModel;
