const express = require('express');   
const Razorpay = require("razorpay");
const path = require('path');      
const cors = require('cors');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
const useragent = require('express-useragent');
const mongoose = require('mongoose');
const restrictedRoute = require('./routes/restrictedRoute');

// Initialise the Express App
const app = express();
const port = process.env.PORT || 5000;

// Middleware to Parse JSON Bodies:
app.use(express.json());

// Middleware to Extract User Agent Details:
app.use(useragent.express());

// Mongo DB Atlas String Connection
const mongoURI = 'mongodb://localhost:27017'; // or your MongoDB Atlas connection string
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const secretKey = 'your-secret-key';

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.post('/api/login', (req, res) => {
    const loginInfo = {
        ip: req.ip,
        browser: req.useragent.browser,
        os: req.useragent.os,
        platform: req.useragent.platform,
    };

    // Save loginInfo to your database
    console.log(loginInfo);

    const token = jwt.sign({ userId: req.body.userId }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/protected', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token has expired or is invalid.');
        }
        res.send('Access granted.');
    });
});

// Use the restricted route
app.use('/restricted-route', restrictedRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Set up nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

app.post('/send-otp', (req, res) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    const token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: req.body.email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('OTP sent: ' + info.response);
    });

    // Save the secret to the user's record in the database
});

app.post('/verify-otp', (req, res) => {
    const isValid = speakeasy.totp.verify({
        secret: req.body.secret,
        encoding: 'base32',
        token: req.body.token,
    });

    if (isValid) {
        res.send('OTP is valid.');
    } else {
        res.status(401).send('Invalid OTP.');
    }
});

const uri = `mongodb+srv://twitter_admin:XkV80JAqGQBEEkrB@cluster0.bpb775a.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const postCollection = client.db("database").collection("posts"); 
        const userCollection = client.db("database").collection("users"); 

        // get
        app.get('/user', async (req, res) => {
            const user = await userCollection.find().toArray();
            res.send(user);
        });

        app.get('/loggedInUser', async (req, res) => {
            const email = req.query.email;
            const user = await userCollection.find({ email: email }).toArray();
            res.send(user);
        });

        app.get('/post', async (req, res) => {
            const post = (await postCollection.find().toArray()).reverse();
            res.send(post);
        });

        app.get('/userPost', async (req, res) => {
            const email = req.query.email;
            const post = (await postCollection.find({ email: email }).toArray()).reverse();
            res.send(post);
        });

        // post
        app.post('/register', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.post('/post', async (req, res) => {
            const post = req.body;
            const result = await postCollection.insertOne(post);
            res.send(result);
        });

        // patch
        app.patch('/userUpdates/:email', async (req, res) => {
            const filter = req.params;
            const profile = req.body;
            const options = { upsert: true };
            const updateDoc = { $set: profile };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

    } catch (error) {
        console.log(error);
    }
}

run().catch(console.dir);

app.post('/orders', (req, res) => {
    const razorpay = new Razorpay({
        key_id: "your_razorpay_key_id",
        key_secret: "your_razorpay_key_secret"
    });

    // Create order logic here
    res.send('Order endpoint');
});

app.get('/', (req, res) => {
    res.send('Hello from Twitter Clone!');
});

app.listen(port, () => {
    console.log(`Twitter clone is listening on port ${port}`);
});
