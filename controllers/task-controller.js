const { findByIdAndUpdate } = require("../models/Task");
const Task = require("../models/Task");

const createTask = async (req, res) => {
    const {title, completed} = req.body;
    const data = {
        title,
        user: req.user.id,
        completed
    }

    try {
        const newTask = new Task(data);

        const savedTask = await newTask.save();

        return res.status(200).json(savedTask)

    } catch (error) { 
        return res.status(400).json({
            msg: "No se puedo crear la tarea."
        })
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({
            tasks
        });
    } catch (error) {
        return res.status(400).json({
            msg: "No se pudo obtener las tareas."
        })
    }
}

const getCurrentUserTask = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user.id});
        return res.status(200).json({
            tasks
        });
    } catch (error) {
        return res.status(400).json({
            msg: "No se pudieron obtener las tareas."
        })
    }
}

const updateTask = async (req, res) => {
    const {taskId} = req.params;
    const {_id, user, ...resto} = req.body;
    console.log("Hola desde update")
    try {
        //We look for the task by his id
        const task = await Task.findById(taskId);

        if(!task) return res.status(404).json({msg: "No task found"});

        //We compare if the task user id is the same than user id
        if(task.user.toString() !== req.user.id) return res.status(401).json({msg: "It's not your task!"});

        const updatedTask = await Task.findByIdAndUpdate(taskId, resto, {new: true});

        return res.status(200).json({
            updatedTask
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: "We could not update your task."
        })
    }
}

const deleteTask = async (req, res) => {
    const {taskId} = req.params;

    try {
        const taskToDelete = await Task.findById(taskId);
        if (!taskToDelete) return res.status(404).json({msg: "No task found."});
        
         //We compare if the task user id is the same than user id
         if(taskToDelete.user.toString() !== req.user.id) return res.status(401).json({msg: "It's not your task!"});

         const deletedTask = await Task.findByIdAndDelete(taskId);

         return res.status(200).json({
            msg: "Task deleted correctly!"
         })
        
    } catch (error) {
        return res.status(400).json({
            msg: "We could not delete your task."
        })
    }
}

module.exports = {
    createTask,
    getTasks,
    getCurrentUserTask,
    updateTask,
    deleteTask
}

