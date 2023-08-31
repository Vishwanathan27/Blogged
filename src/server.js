const express = require('express');

const app = express();
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");

// Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src": ["'self'", "http:", "https:"],
      },
    },
  })
);

app.set("trust proxy", true);

// Protect against XSS attacks, should come before any routes
app.use(xssClean());

// Restrict all routes to only 50 requests per IP address every minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50, // 50 requests per IP
});
app.use(limiter);

// enable cors
app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());

// Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Node.js REST API Boilerplate with Express",
    version: "1.0.0",
  },
  schemes: ["http"],
  components: {
    securitySchemes: {
      JWT: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:80/api/v1",
    },
    {
      url: "http://54.194.24.88/api/v1",
    },
    {
      url: "http://54.194.24.88",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["src/routes/v1/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", (req, res, next) => {
  req.protocol = 'http';
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// v1 api routes
app.use("/api/v1", routes);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  console.log(`Unknown request path: ${req.path}`);
  next(new ApiError(404, 'Not found'));
});

module.exports = app;
