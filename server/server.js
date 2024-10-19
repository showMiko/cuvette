const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const otpRoutes = require('./routes/otpRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes=require("./routes/jobRoutes");

const app = express();
app.use(cors());
app.use(express.json());


connectDB();


app.use('/api', otpRoutes);
app.use('/api',userRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
