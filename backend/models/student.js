const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const StudentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollnumber: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String },
    interest: { type: String },
    department: { type: String,default: 'null' },
    degree: { type: String },
    subject: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },

});

module.exports = Mongoose.model("students", StudentSchema);