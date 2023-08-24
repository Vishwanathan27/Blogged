const express = require('express');

const app = express();
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/v1');
const ApiError = require('./utils/ApiError');

// Helmet
app.use(helmet());

// enable cors
app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());

// v1 api routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

module.exports = app;
