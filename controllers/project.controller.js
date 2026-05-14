const Project = require("../models/project.model");

// CREATE PROJECT + MULTIPLE IMAGES
exports.createProject = async (req, res) => {
  try {
    const { name, subtitle, country, year, desc, tags } = req.body;

    const photos = req.files.map(file => ({
      src: `/images/${file.filename}`,
      caption: file.originalname,
    }));

    const project = await Project.create({
      name,
      subtitle,
      country,
      year,
      desc,
      tags: tags ? tags.split(",") : [],
      photos,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

// GET ONE
exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Not found" });
  res.json(project);
};

// UPDATE
exports.updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE
exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};