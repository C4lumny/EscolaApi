const { Router } = require("express");
const {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentInfoById,
  getAllStudentsByCourse,
} = require("../controllers/students.controllers");

const router = Router();

router.get("/students", getAllStudents);
router.get("/students/:id", getStudentInfoById);
router.get("/students/courses/:id", getAllStudentsByCourse);
router.post("/students", createStudent);
router.put("/students", updateStudent);
router.delete("/students/:id", deleteStudent);

module.exports = {
  studentsRouter: router,
};
