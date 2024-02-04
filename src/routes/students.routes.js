const { Router } = require('express');
const { createStudent, getAllStudents } = require('../controllers/students.controllers');

const router = Router();

router.get('/students', getAllStudents);
router.post('/students', createStudent);
// router.put('./users/:id');
// router.delete('./users/:id');
// router.get('./users/:id');

module.exports = {
    studentsRouter: router,
}