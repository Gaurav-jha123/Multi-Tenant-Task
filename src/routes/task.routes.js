const router = require("express").Router();
const taskController = require("../controllers/task.controller");
const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.patch("/:id/status", taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
