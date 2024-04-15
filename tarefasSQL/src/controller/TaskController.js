const {pool} = require("../database")
const checkTaskExists = require("../middlewares/checkTaskExist")
class TaskController {
    
    async createTask(req, res) {
        const {user_id} = req.params
        const {title, description} = req.body

        const task = {
            title,
            description,
            isCompleted: false,
            user_id,
            created_at: `${new Date()}`,
            updated_at: `${new Date()}`
            
        }

        await pool.query(
            "INSERT INTO tasks (title, description, isCompleted, user_id, created_at, update_at) VALUES (?, ?, ?, ?, ?, ?)", [task.title, task.description, task.isCompleted, task.user_id, task.created_at, task.updated_at]
        )

        res.status(201).json(task)
    }

    async listTask(req, res) {
        const [tasks] = await pool.query(
            "SELECT title, description, isCompleted FROM tasks"
        )

        res.status(200).json(tasks)
    }

    async listTaskById(req, res) {
        const {id} = req.params
        
        const [tasks] = await pool.query(`
        SELECT title, description, isCompleted FROM tasks WHERE id = ${id}
        `)

        res.status(200).json(tasks)
    }

    async updateTask(req, res) {
        const {id} = req.params
        const {title, description} = req.body

        await pool.query(`
        UPDATE tasks SET title="${title}", description="${description}" WHERE id=${id}
        `)

        return res.status(200).json("Registro atualizado com sucesso.")
    }

    async updateTaskStatus(req, res) {
        const {id} = req.params

        await pool.query(`
        UPDATE tasks SET isCompleted = 1 WHERE id = ${id}
        `)

        return res.status(200).json("Status atualizado com sucesso.")
    }

    async deleteTask(req, res) {
        const {id} = req.params

        await pool.query(`
        DELETE FROM tasks WHERE id = ${id}
        `)

        return res.status(200).json("Deletado com sucesso.")
    }

}

module.exports = TaskController