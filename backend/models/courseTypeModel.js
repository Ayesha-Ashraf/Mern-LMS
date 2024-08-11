
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const courseTypeSchema = new mongoose.Schema({

    courseTypeName: {
        type: String,
        trim: true,
        required: [true, 'course category is required'],
        maxlength: 70,
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

module.exports = mongoose.model("CourseType", courseTypeSchema);