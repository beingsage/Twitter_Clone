const UserAccess = require('../models/UserAccess');

async function timeBasedAccessControl(req, res, next) {
    const userId = req.body.userId; // Assume the user ID is passed in the request body
    const currentTime = new Date();
    const thirtyMinutesInMs = 30 * 60 * 1000;

    try {
        // Find the user's access record
        let userAccess = await UserAccess.findOne({ user_id: userId });

        if (userAccess) {
            const accessTime = new Date(userAccess.access_time);
            const timeDifference = currentTime - accessTime;

            if (timeDifference > thirtyMinutesInMs) {
                // If access time is more than 30 minutes ago, update access time
                userAccess.access_time = currentTime;
                await userAccess.save();
                next();
            } else {
                // Deny access if within the 30-minute window
                res.status(403).send('Access not allowed. You have already accessed this route within the last 30 minutes.');
            }
        } else {
            // If no record exists, create a new one
            userAccess = new UserAccess({
                user_id: userId,
                access_time: currentTime,
            });
            await userAccess.save();
            next();
        }
    } catch (error) {
        console.error('Error in access control middleware:', error);
        res.status(500).send('Internal server error');}}

module.exports = timeBasedAccessControl;