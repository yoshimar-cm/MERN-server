const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       trim:true
    },
    author:{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    created_at:{
        type: Date,
        default: Date.now()
    }

});

const Project = mongoose.model('Project',projectSchema);
module.exports = Project;
