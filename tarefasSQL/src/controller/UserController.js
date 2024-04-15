const {pool} = require("../database")
const checkUserExist = require("../middlewares/checkUserExist")
class UserController { 

async createUser(req, res) {
    const {name,  email, password, isAdmin} = req.body
    const users = {

        name,
        email,
        password,
        isAdmin
        
    }

    await pool.query(
        "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)", [users.name, users.email, users.password, users.isAdmin]
        
    )

    res.status(201).json(users)

}

async listUser(req, res) {
    const [users] = await pool.query(`
    SELECT name, email, isAdmin FROM users `)

    res.status(200).json(users)
}

async listUserById (req, res) {
    const {user_id} = req.params
        
        const [users] = await pool.query(`
        SELECT name, email, isAdmin FROM users WHERE id = ${user_id}
        `)

        res.status(200).json(users)
} 

async updateUser(req, res) {
    const {user_id} = req.params
    const {name, email, password, isAdmin} = req.body

    await pool.query(`
    UPDATE users SET name = "${name}", email = "${email}", password = "${password}", isAdmin = "${isAdmin}" WHERE id = ${user_id} `)

    return res.status(200).json("Usuario atualizado com sucesso.")
}

async deleteUser(req, res) {
    const {user_id} = req.params

    await pool.query(`
    DELETE FROM users WHERE id = "${user_id}"`)

    return res.status(200).json("Usuario deletado com sucesso.")
}

}

module.exports = UserController