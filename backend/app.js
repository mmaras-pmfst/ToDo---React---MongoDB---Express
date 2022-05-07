const config = require('./utilis/config');
const express = require('express');
const app = express();
const cors = require('cors');

//#region //*IMPORT ROUTES
const taskRoute = require('./routes/tasks');
const adminRoute = require('./routes/admin');
const authRoute = require('./routes/auth');
//#endregion

//#region //*DATABASE CONNECTION
const mongoose = require('mongoose');

mongoose.connect(
  config.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to database!');
  }
);
//#endregion

//#region //*MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/admin', adminRoute);
//#endregion

module.exports = app;
