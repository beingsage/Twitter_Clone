const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAccessSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    access_time: { type: Date, default: Date.now },
});

const UserAccess = mongoose.model('UserAccess', userAccessSchema);

module.exports = UserAccess;
