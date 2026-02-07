const router = require("express").Router();
const controller = require("../controllers/staff.controller");

router.get("/", controller.getAllStaff);
router.get("/:id", controller.getStaffById);

router.post("/", controller.createStaff);
router.put("/:id", controller.updateStaff);
router.delete("/:id", controller.deleteStaff);

module.exports = router;
