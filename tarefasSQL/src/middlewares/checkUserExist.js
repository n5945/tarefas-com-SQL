const { pool } = require("../database");


async function checkUserExist(req, res, next) {
    const {user_id} = req.params
    const [user] = await pool.query(`
    SELECT * FROM users WHERE id = ${user_id}
    `)

    if(user.length === 0) {
        return res.status(400).json("Usuario não encontrada.")
    }
    next( )
}

module.exports = checkUserExist