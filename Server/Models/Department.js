const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }]
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
