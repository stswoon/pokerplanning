const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))

app.get('/health', function (req, res) {
  res.send('OK');
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));