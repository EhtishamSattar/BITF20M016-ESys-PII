const Mongoose=require('mongoose');
const Schema = Mongoose.Schema;

const AdminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true  },
});

module.exports = Mongoose.model("admins", AdminSchema);