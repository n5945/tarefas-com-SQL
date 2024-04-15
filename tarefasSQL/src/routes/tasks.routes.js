const {Router} = require("express")
const TaskController = require("../controller/TaskController")
const checkTaskExists = require("../middlewares/checkTaskExist")
const checkUserExist = require("../middlewares/checkUserExist")

const taskRoutes = Router()
const taskController = new TaskController()

taskRoutes.post("/tasks/:user_id", checkUserExist, taskController.createTask)
taskRoutes.get("/tasks", taskController.listTask)
taskRoutes.get("/tasks/:id", checkTaskExists, taskController.listTaskById)
taskRoutes.put("/tasks/:id", checkTaskExists, taskController.updateTask)
taskRoutes.patch("/tasks/status/:id", checkTaskExists, taskController.updateTaskStatus)
taskRoutes.delete("/tasks/:id", checkTaskExists, taskController.deleteTask)

module.exports = taskRoutes