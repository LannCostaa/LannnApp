const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint untuk menyimpan data
app.post('/save', (req, res) => {
  const data = req.body;
  fs.writeFileSync('data/spreadsheet.json', JSON.stringify(data));
  res.send({ message: 'Data saved successfully!' });
});

// Endpoint untuk mengambil data
app.get('/load', (req, res) => {
  if (fs.existsSync('data/spreadsheet.json')) {
    const data = JSON.parse(fs.readFileSync('data/spreadsheet.json'));
    res.send(data);
  } else {
    res.send([]);
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
