const { Router } = require('express');
const { getAllSubjects, getSubjectsById, deleteSubjects, updateSubjects, createSubjects, getSubjectsByStudentId, getSubjectsByTeacherId } = require("../controllers/subject.controllers")

const router = Router();

router.get('/subjects', getAllSubjects);
router.get('/subjects/:id', getSubjectsById);
router.get('/subjects/students/:id', getSubjectsByStudentId);
router.get('/subjects/teachers/:id', getSubjectsByTeacherId);
router.post('/subjects', createSubjects);
router.put('/subjects', updateSubjects );
router.delete('/subjects/:id', deleteSubjects);

module.exports = {
    subjectsRouter: router,
}
