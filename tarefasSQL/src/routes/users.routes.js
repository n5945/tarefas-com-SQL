const {Router} = require("express")
const UserController = require("../controller/UserController")
const checkUserExist = require("../middlewares/checkUserExist")

const userRoutes = Router()
const userController = new UserController()

userRoutes.post("/users", userController.createUser)
userRoutes.get("/users", userController.listUser)
userRoutes.get("/users/:user_id", checkUserExist, userController.listUserById)
userRoutes.put("/users/:user_id", checkUserExist, userController.updateUser)
userRoutes.delete("/users/:user_id", checkUserExist, userController.deleteUser)

module.exports = userRoutes