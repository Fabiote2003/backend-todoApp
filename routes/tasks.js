const {Router} = require('express');
const checkAuth = require('../middleware/checkAuth');
const taskRouter = Router();
const {createTask, getTasks, getCurrentUserTask, updateTask, deleteTask} = require('../controllers/task-controller')
 
taskRouter.post("/", [
    checkAuth
], createTask);

taskRouter.get("/all", [
    checkAuth
], getTasks);

taskRouter.get("/my-tasks", [
    checkAuth
], getCurrentUserTask);

taskRouter.put("/:taskId", [
    checkAuth
], updateTask);

taskRouter.delete("/:taskId", [
    checkAuth
], deleteTask);

module.exports = taskRouter;