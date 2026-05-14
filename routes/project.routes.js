const express = require("express");
const router = express.Router();

const upload = require("../middlewares/images");
const controller = require("../controllers/project.controller");

// CREATE (MULTIPLE IMAGES)
router.post("/", upload.array("photos", 20), controller.createProject);

// READ
router.get("/", controller.getProjects);
router.get("/:id", controller.getProjectById);

// UPDATE
router.put("/:id", controller.updateProject);

// DELETE
router.delete("/:id", controller.deleteProject);

module.exports = router;