const express = require('express');
const router = express.Router();
const { createCourse, singleCourse, updateCourse, showCourses, deleteCourse } = require('../controllers/coursesController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//courses routes

// /api/course/create
router.post('/course/create', isAuthenticated, isAdmin, createCourse);
// /api/course/id
router.get('/course/:id', singleCourse);
// /api/course/update/course_id
router.put('/course/update/:course_id', isAuthenticated, isAdmin, updateCourse);
// /api/course/delete/course_id
router.delete('/course/delete/:course_id', isAuthenticated, isAdmin, deleteCourse);
// /api/courses/show
router.get('/courses/show', showCourses);



module.exports = router;