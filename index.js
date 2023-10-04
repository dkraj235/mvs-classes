const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://mvsclasses:mvsclasses80029@mvsclasses.i8rkiop.mongodb.net/?appName=mongosh+1.6.1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    subject: String,
    message: String,
  });
  
  const Contact = mongoose.model('Contact', contactSchema);


// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
});

// Handle form submissions
app.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message,
    });
    await newContact.save();
    res.redirect('/'); // Redirect to the form page or a thank you page
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
