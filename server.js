const express = require('express');
const app = express();

app.use(express.json({ limit: '1mb' }));

// Simpan data di memory (reset kalau server restart/sleep)
let latestData = [];

// GET — diambil oleh app Android
app.get('/get.php', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(latestData);
});

// POST — dikirim oleh Main.cpp (game)
app.post('/push.php', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ status: 'error', message: 'Invalid JSON' });
  }
  latestData = req.body;
  res.json({ status: 'ok' });
});

// Halaman cek sederhana
app.get('/', (req, res) => {
  res.send('Minimap backend is running. Heroes: ' + latestData.length);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
