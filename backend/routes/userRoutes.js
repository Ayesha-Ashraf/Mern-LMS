const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserCoursesHistory } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


//User routes

// /api/all Users
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
// /api/user/id
router.get('/user/:id', isAuthenticated, singleUser);
// /api/User/edit/id
router.put('/user/edit/:id', isAuthenticated, editUser);
// /api/admin/user/delete/id
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);
// /api/user/coursehistory
router.post('/user/coursehistory', isAuthenticated, createUserCoursesHistory);




module.exports = router;