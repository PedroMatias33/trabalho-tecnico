const express = require("express");
const cors = require("cors");

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, ()=> console.log ("rodando na porta" + port));

const connection = require('./db.config.js');

app.post('/usuarios/cadastrar', (request, response) => {
    let params = [
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.telefone
        // aqui os requerimentos são as coisas que tu colocou na taberla de usuarios
    ]

    let query = "INSERT INTO *aqui colocar o nome da tabela de usuarios do sql* (nome, email, senha, telefone) VALUES (?, ?, ?, ?);";
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {    
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    });
});

app.get('/usuarios/listar', (request, response) => {
    let query = "SELECT * FROM *aqui colocar o nome da tabela de usuarios do sql*";
    connection.query(query, (err, results) =>{
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    })
});

app.put('/usuarios/alterar/:id', (request, response) => {
    let params = Array(
        request.params.id,
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.telefone
        // aqui são os mesmo requerimentos da tabela de usuarios
)

    let query = "UPDATE *aqui colocar o nome da tabela de usuarios do sql* SET nome = (?),email = (?), senha = (?), telefone = (?)";
    connection.query(query, params, (err, results) =>{
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    })
})
app.post('/produtos/cadastrar', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.preco,
        request.body.quantidade
        // aqui são os requerimentos da tabela de produtos do sql
)

    let query = "INSERT INTO *aqui colocar o nome da tabela de produtos do sql* (nome, preco, quantidade) VALUES (?, ?, ?);";
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {    
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    });
});
app.put('/produtos/alterar/:id', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.preco,
        request.body.quantidade,
        request.params.id
        // aqui são os requerimentos da tabela de produtos do sql
    )

    let query = "UPDATE *aqui colocar o nome da tabela de produtos do sql* SET nome = (?), preco = (?), quantidade = (?) WHERE id = (?)";
    connection.query(query, params, (err, results) =>{
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    })
})


app.delete("/usuarios/deletar/:id", (request, response) => {
    let params = Array(
        request.params.id
    )
    let query = "DELETE FROM *aqui colocar o nome da tabela de usuarios do sql* WHERE id = (?)";
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {    
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    })
})
app.delete("/produtos/deletar/:id", (request, response) => {
    let params = Array(
        request.params.id
    )
    let query = "DELETE FROM *aqui colocar o nome da tabela de produtos do sql* WHERE id = (?)";
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {    
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    })
})

app.get('/produtos/listar', (request, response) => {
    let query = "SELECT * FROM *aqui colocar o nome da tabela de produtos do sql*";
    connection.query(query, (err, results) =>{
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    })
});

app.get('/usuarios/listar', (request, response) => {
    let query = "SELECT * FROM *aqui colocar o nome da tabela de usuarios do sql*";
    connection.query(query, (err, results) =>{
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso",
                data: results
            });
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso",
                data: err
            });
        }
    })
});