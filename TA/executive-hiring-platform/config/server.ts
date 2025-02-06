import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Import routes here and use them
// Example: app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;