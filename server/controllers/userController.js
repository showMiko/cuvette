const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createUser = async (req, res) => {
  const { name, phone, companyName, companyEmail, employeeSize, password } = req.body;

  try {

    const existingUser = await User.findOne({ companyEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = new User({
      name,
      phone,
      companyName,
      companyEmail,
      employeeSize,
      password: hashedPassword,
    });


    await user.save();


    const token = jwt.sign(
      { userId: user._id, companyEmail: user.companyEmail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { companyEmail, password } = req.body;

  try {

    const user = await User.findOne({ companyEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const token = jwt.sign(
      { userId: user._id, companyEmail: user.companyEmail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  createUser,
  login
};
