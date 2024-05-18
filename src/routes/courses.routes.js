const { Router } = require('express');
const { getAllCourses, deleteCourses, updateCourses, createCourses } = require("../controllers/courses.controllers")

const router = Router();

router.get('/courses', getAllCourses);
router.post('/courses', createCourses);
router.put('/courses', updateCourses );
router.delete('/courses/:id', deleteCourses);

module.exports = {
    coursesRouter: router,
}

