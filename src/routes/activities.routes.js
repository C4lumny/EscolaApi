const { Router } = require("express");
const {
  createActivity,
  deleteActivity,
  getAllActivities,
  updateActivity,
} = require("../controllers/activities.controllers");

const router = Router();

router.get("/activities", getAllActivities);
router.post("/activities", createActivity);
router.put("/activities", updateActivity);
router.delete("/activities/:id", deleteActivity);

module.exports = {
  activitiesRouter: router,
};
