const { Router } = require('express');
const { getAllSubjects, deleteSubjects, updateSubjects, createSubjects } = require("../controllers/subject.controllers")

const router = Router();

router.get('/subjects', getAllSubjects);
router.post('/subjects', createSubjects);
router.put('/subjects', updateSubjects );
router.delete('/subjects', deleteSubjects);

module.exports = {
    subjectsRouter: router,
}
