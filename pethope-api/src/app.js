const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const campaignRoutes = require("./routes/campaignRoutes");
const historyRoutes = require("./routes/historyRoutes");

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/history', historyRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;