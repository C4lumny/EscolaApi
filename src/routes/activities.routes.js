const { Router } = require("express");
const {
  createActivity,
  deleteActivity,
  getAllActivities,
  getAllActiveActivities,
  getAllSubjectActivities,
  updateActivity,
} = require("../controllers/activities.controllers");

const router = Router();

router.get("/activities", getAllActivities);
router.get("/activities/:id", getAllActiveActivities);
router.get("/activities/subjects/:id", getAllSubjectActivities);
router.post("/activities", createActivity);
router.put("/activities", updateActivity);
router.delete("/activities/:id", deleteActivity);

module.exports = {
  activitiesRouter: router,
};
