const mongoose = require('mongoose');



const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    status:{
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    project:{
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    }

});

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;