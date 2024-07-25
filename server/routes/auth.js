 const express = require('express');
 const User = require('../models/User');
 const app = express();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { jwtSecret } = require('../config/config');

app.use(express.json());

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

// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (user) return res.status(400).json({ msg: 'User already exists' });

//         user = new User({ username, email, password });
//         await user.save();

//         const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//         const isMatch = await user.comparePassword(password);
//         if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//         const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
