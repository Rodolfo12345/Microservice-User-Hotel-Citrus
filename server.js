const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/Users.json');
const usersRoutes = require('./srs/routes/usersRoutes');
const errorHandler = require('./srs//middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', usersRoutes);

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
