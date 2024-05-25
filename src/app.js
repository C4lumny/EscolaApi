// 👇Import de routers
const { studentsRouter } = require("./routes/students.routes");
const { authRouter } = require("./routes/auth.routes");
const { coursesRouter } = require("./routes/courses.routes");
const { teachersRouter } = require("./routes/teachers.routes");
const { subjectsRouter } = require("./routes/subject.routes");
const { parentsRouter } = require("./routes/parents.routes");
const { activitiesRouter } = require("./routes/activities.routes");
const { developmentsRouter } = require("./routes/developments.routes");
const { statisticsRouter } = require("./routes/statistics.routes");
// 👇Import de utilidades
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const routers = [
  authRouter,
  studentsRouter,
  teachersRouter,
  coursesRouter,
  subjectsRouter,
  parentsRouter,
  activitiesRouter,
  developmentsRouter,
  statisticsRouter,
];

// 👇 Uso de funciones de la app
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(...routers);

module.exports = app;
