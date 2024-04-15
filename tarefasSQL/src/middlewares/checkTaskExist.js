const { pool } = require("../database");


async function checkTaskExists(req, res, next) {
    const {id} = req.params
    const [task] = await pool.query(`
    SELECT * FROM tasks WHERE id = ${id}
    `)

    if(task.length === 0) {
        return res.status(400).json("Tarefa não encontrada.")
    }
    next( )
}

module.exports = checkTaskExists