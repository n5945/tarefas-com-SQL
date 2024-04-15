const express = require('express');
const routes = require('./routes');

const app = express()

app.use(express.json())
app.use(routes)


//retorno do servidor em caso de erro
app.use((err, rep, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo deu errado!")
})

//delimitando porta do servidor
const PORT = 3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})