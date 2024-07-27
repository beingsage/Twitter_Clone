const express = require('express');
const router = express.Router();
const timeBasedAccessControl = require('../middleware/timeBasedAccessControl');

router.use(timeBasedAccessControl);

router.get('/', (req, res) => {
    res.send('Welcome to the restricted route. Access is allowed.');
});

module.exports = router;
