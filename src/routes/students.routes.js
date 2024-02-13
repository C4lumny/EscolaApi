const { Router } = require('express');
const { createStudent, getAllStudents, updateStudent, deleteStudent } = require('../controllers/students.controllers');

const router = Router();

router.get('/students', getAllStudents);
router.post('/students', createStudent);
router.put('/students', updateStudent);
router.delete('/students', deleteStudent);

module.exports = {
    studentsRouter: router,
}