const { Router } = require("express");
const {
  createActivity,
  deleteActivity,
  getAllActivities,
  getActivitiesById,
  getAllActiveActivities,
  getAllSubjectActivities,
  updateActivity,
} = require("../controllers/activities.controllers");

const router = Router();

router.get("/activities", getAllActivities);
router.get("/activities/:id", getActivitiesById);
router.get("/activities/students/:id", getAllActiveActivities);
router.get("/activities/subjects/:id", getAllSubjectActivities);
router.post("/activities", createActivity);
router.put("/activities", updateActivity);
router.delete("/activities/:id", deleteActivity);

module.exports = {
  activitiesRouter: router,
};
