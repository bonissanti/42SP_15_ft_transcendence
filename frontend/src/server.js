const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname)));

app.get('/pong', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pong/pong.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
