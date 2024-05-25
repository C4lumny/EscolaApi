const { Router } = require('express');
const { getAllTeachers, getTeacherInfoById, deleteTeachers, updateTeachers, createTeachers } = require("../controllers/teachers.controllers")

const router = Router();

router.get('/teachers', getAllTeachers)
router.get('/teachers/:id', getTeacherInfoById)
router.delete('/teachers/:id', deleteTeachers)
router.put('/teachers', updateTeachers )
router.post('/teachers', createTeachers);

module.exports = {
    teachersRouter: router,
}

