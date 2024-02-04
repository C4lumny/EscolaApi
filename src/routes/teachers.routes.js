const { Router } = require('express');
const { getAllTeachers, deleteTeachers, updateTeachers } = require("../controllers/teachers.controllers")

const router = Router();

router.get('/teachers', getAllTeachers)
router.delete('/teachers', deleteTeachers)
router.put('/teachers', updateTeachers )

module.exports = {
    teachersRouter: router,
}

