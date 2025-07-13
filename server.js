const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // To parse form data

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your MongoDB Atlas connection string
const mongoAtlasUri = "mongodb+srv://andytst2005:B11cFuru9j0f47qt@cluster0.a5qfl.mongodb.net/mydatabase?retryWrites=true&w=majority/crud";

mongoose.connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

app.post('/submit-form', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email
    });
    await newUser.save();
    res.send('Form data submitted successfully!');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error submitting form data.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
