
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
  
    available: {
        type: Boolean,
        default: true
    },
    courseType: {
        type: ObjectId,
        ref: "CourseType",
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
        

    }

}, { timestamps: true })

module.exports = mongoose.model("Course", courseSchema);