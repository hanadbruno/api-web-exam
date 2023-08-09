const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/time_management_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/time_management_app',
    collection: 'sessions',
});

app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

// Routes
const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activities');
// Add more routes as needed

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
// Use other routes similarly

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
