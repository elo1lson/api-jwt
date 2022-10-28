'use strict'

require('./src/config/database')

const express = require('express');
const routes = require('./src/routes')

const app = express()
const port = 3001

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log('Acessar http://localhost:' + port);
})