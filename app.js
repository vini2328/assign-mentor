const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config()

const mentorRoutes = require('./routes/mentor')
const studentRoutes = require('./routes/student');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
  res.send("HI WORLD................................................")
})

// Routes
app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
