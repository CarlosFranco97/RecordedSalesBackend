const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
const path = require('path')
const app = express();
require('dotenv').config();


dbConnection();

app.use(cors());


app.use(express.static('public'))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

app.use('/api/events', require('./routes/events'));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public", "index.html"));
  });

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});