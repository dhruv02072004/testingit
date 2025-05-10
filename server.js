const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.post('/process', (req, res) => {
  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res.status(400).json({ error: '`data` must be an array' });
  }

  const odd_numbers = [];
  const even_numbers = [];
  const alphabets = [];

  data.forEach(item => {
    if (/^[A-Za-z]$/.test(item)) {
      alphabets.push(item.toUpperCase());
    } else if (/^\d+$/.test(item)) {
      const num = parseInt(item, 10);
      (num % 2 === 0 ? even_numbers : odd_numbers).push(item);
    }
  });

  res.json({
    is_success: true,
    user_id: 'Dhruv Malviya',
    email:   'dhruvmalviya220807@acropolis.in',
    roll_number: '0827CS221086',
    odd_numbers,
    even_numbers,
    alphabets
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
