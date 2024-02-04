const { pool } = require("../database/database");
const { Pool } = require('pg');

const getStudent = (req, res) => {
  res.send("Getting student");
};

const getAllStudents = async (req, res) => {
  try {
    const { rows: students } = await pool.query("SELECT * FROM estudiantes");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createStudent = (req, res) => {
  res.send("Creating student");
};

const updateStudent = (req, res) => {
  res.send("Updating student");
};

const deleteStudent = (req, res) => {
  res.send("Deleting student");
};

module.exports = {
  getStudent,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
