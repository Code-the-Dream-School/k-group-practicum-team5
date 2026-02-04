const Staff = require("../models/Staff");

// GET all staff
exports.getAllStaff = async (req, res) => {
  try {
    const { department, search } = req.query;

    const filter = {};

    if (department) filter.department = department;

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const staff = await Staff.find(filter).sort({ name: 1 });

    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) return res.status(404).json({ message: "Not found" });

    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createStaff = async (req, res) => {
  try {
    const newStaff = await Staff.create(req.body);
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
exports.updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE (admin)
exports.deleteStaff = async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
