const express = require('express');
const cors = require('cors'); 
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const port = 2500;

app.get('/api/key', (req, res) => {
  const apiKey = process.env.API_KEY;
  if (apiKey) {
    console.log('API KEY Retrieved successfully', apiKey)
    res.json({ apiKey });
  } else {
    console.log('API key not found');
    res.status(500).json({ error: 'API key not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});