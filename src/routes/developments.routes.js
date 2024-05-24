const { Router } = require("express");
const {
  createDevelopment,
  deleteDevelopments,
  getAllDevelopments,
  getDevelopmentByActivity,
  updateDevelopments,
} = require("../controllers/developments.controllers");

const router = Router();

router.get("/developments", getAllDevelopments);
router.get("/developments/activity/:id", getDevelopmentByActivity);
router.post("/developments", createDevelopment);
router.put("/developments", updateDevelopments);
router.delete("/developments/:id", deleteDevelopments);

module.exports = {
  developmentsRouter: router,
};
