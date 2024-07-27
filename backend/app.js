const express = require('express');
const mongoose = require('mongoose');
const useragent = require('express-useragent');
const LoginInfo = require('./models/LoginInfo');

const app = express();
app.use(useragent.express());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/login', async (req, res) => {
    const { browser, version, os, platform, source } = req.useragent;
    const ip = req.ip;

    // Create a new login info document
    const loginInfo = new LoginInfo({
        browser,
        version,
        os,
        platform,
        source,
        ip
    });

    try {
        // Save the document to the database
        await loginInfo.save();
        res.status(200).send('Login information saved successfully.');
    } catch (error) {
        res.status(500).send('Error saving login information.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
