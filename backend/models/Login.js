const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    browser: { type: String, required: true },
    version: { type: String, required: true },
    os: { type: String, required: true },
    platform: { type: String, required: true },
    ip_address: { type: String, required: true },
    login_time: { type: Date, default: Date.now },
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;



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