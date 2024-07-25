const mongoose = require('mongoose');
// 

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password : String
})

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel 
