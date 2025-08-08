const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const morgan = require('morgan');
app.use(morgan("dev"));

// Middleware for parsing JSON
app.use(express.json());

// console Handling For API
app.use((req, res, next) => {
    console.log(`➡️  ${req.method} ${req.originalUrl}`);
    console.log('📦  Body:', req.body);

    const oldSend = res.send;
    res.send = function (data) {
        console.log('⬅️  Response:', data);
        oldSend.apply(res, arguments);
    };
    next();
});

// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Error handling middleware (must come after routes)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
