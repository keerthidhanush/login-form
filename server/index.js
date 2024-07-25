// const express = require('express');
// const mongoose = require('mongoose');
// // const dotenv = require('dotenv');
// const cors = require('cors');
// const UserModel =require("./models/User");
// // const UserModel = require ('./models/user');


// // dotenv.config();

// const app = express();
// // const PORT = process.env.PORT || 3001;
// // const MONGO_URI = process.env.MONGO_URI;

// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://localhost:27017/mydb")
    


// app.post('/register',(req,res) => {
//     UserModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// });

// app.listen(3001,()=> {
//     console.log('server is running on port 3001')
// })



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const mongoURI = 'mongodb://localhost:27017/mydb';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
