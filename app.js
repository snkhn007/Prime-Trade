require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth');
const adminMiddleware = require('./middleware/admin');

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// --- View routes ---
app.get('/signup',    (req, res) => res.sendFile(path.join(__dirname, 'view', 'signup.html')));
app.get('/login',     (req, res) => res.sendFile(path.join(__dirname, 'view', 'login.html')));
app.get('/dashboard', authMiddleware, (req, res) => res.sendFile(path.join(__dirname, 'view', 'dashboard.html')));
app.get('/admin',     authMiddleware, adminMiddleware, (req, res) => res.sendFile(path.join(__dirname, 'view', 'admin.html')));

// --- API v1 routes ---
app.use('/api/v1',              require('./routes/auth'));
app.use('/api/v1/tasks',        require('./routes/tasks'));
app.use('/api/v1/admin',        require('./routes/admin'));

app.listen(3000, () => console.log("server Started"));