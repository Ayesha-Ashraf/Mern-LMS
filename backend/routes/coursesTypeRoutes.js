const express = require('express');
const router = express.Router();
const { createCourseType, allCoursesType, updateCourseType, deleteCourseType } = require('../controllers/coursesTypeController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



//course type routes

// /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createCourseType)
// /api/type/courses
router.get('/type/courses', allCoursesType)
// /api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateCourseType)
// /api/type/delete/type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteCourseType)








module.exports = router;