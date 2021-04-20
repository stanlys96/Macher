const express = require('express');
const app = express();
const router = require('./routes/index');

const { connect } = require('./config/mongodb');
const cors = require('cors');

const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connect()
  .then(async (db) => {
    console.log('MongoDB successfully connected!');
    app.use(router);
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}...`);
    })
  })
