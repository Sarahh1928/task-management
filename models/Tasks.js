const mongoose = require('mongoose');

// Define the task schema as a sub-document
const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    Deadline: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Shopping', 'Health'], // Only these values are allowed
        default: 'Work',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Define the main schema for users and their tasks
const UserTasksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tasks: [TaskSchema],  // Array of task sub-documents
});

const Tasks = mongoose.model('UserTasks', UserTasksSchema);

module.exports = Tasks;
