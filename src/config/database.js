'use strict'

require('dotenv').config();

const mongoose = require('mongoose');
const dbUser = process.env.MONGO_USER
const dbPassword = process.env.MONGO_PASSWORD
let _

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.u3tdneo.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log('Concetado ao banco de dados');
}).catch((e) => {
    console.log(e,'Database');

})
module.exports = _ 