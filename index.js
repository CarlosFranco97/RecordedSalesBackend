const express = require('express');
const dbConnection = require('./database/config');
require('dotenv').config();
const app = express();
const cors = require('cors')


dbConnection();

app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});

app.use(express.static('public'))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

app.use('/api/events', require('./routes/events'))
