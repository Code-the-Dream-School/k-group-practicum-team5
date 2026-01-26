const BusinessHours = require("../models/BusinessHour");

// GET all business hours
exports.getBusinessHours = async (req, res) => {
  try {
    const hours = await BusinessHours.find();
    res.json(hours);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch business hours" });
  }
};

// GET open/closed status
exports.getOpenStatus = async (req, res) => {
  try {
    const hours = await BusinessHours.findOne();

    if (!hours || !hours.schedule || hours.schedule.length === 0) {
      return res.json({ isOpen: false, message: "No hours set" });
    }

    const now = new Date();
    const currentDay = now.toLocaleString("en-US", { weekday: "long" });

    const today = hours.schedule.find(d => d.day === currentDay);

    if (!today || !today.open || !today.close) {
      return res.json({ isOpen: false });
    }

    const [openHour, openMin] = today.open.split(":").map(Number);
    const [closeHour, closeMin] = today.close.split(":").map(Number);

    const openTime = new Date();
    openTime.setHours(openHour, openMin, 0, 0);

    const closeTime = new Date();
    closeTime.setHours(closeHour, closeMin, 0, 0);

    const isOpen = now >= openTime && now <= closeTime;

    res.json({ isOpen });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Status check failed" });
  }
};

// UPDATE business hours (admin)
exports.updateBusinessHours = async (req, res) => {
  try {
    const { schedule } = req.body;

    let hours = await BusinessHours.findOne();

    if (!hours) {
      hours = new BusinessHours({ schedule });
    } else {
      hours.schedule = schedule;
    }

    await hours.save();
    res.json(hours);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update business hours" });
  }
};
