const { Router } = require('express');
const { getAllTeachers, deleteTeachers, updateTeachers, createTeachers } = require("../controllers/teachers.controllers")

const router = Router();

router.get('/teachers', getAllTeachers)
router.delete('/teachers', deleteTeachers)
router.put('/teachers', updateTeachers )
router.post('/teachers', createTeachers);

module.exports = {
    teachersRouter: router,
}

