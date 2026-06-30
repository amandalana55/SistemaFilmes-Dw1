const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.delete("/avaliacoes/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM avaliacoes WHERE id = $1",
            [id]
        );

        res.status(200).json({
            mensagem: "Avaliação deletada"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao deletar avaliação"
        });

    }

});

app.delete("/ranking", async (req, res) => {

    try {

        await pool.query("DELETE FROM avaliacoes");

        res.status(200).json({
            mensagem: "Ranking apagado"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao limpar ranking"
        });

    }

});

app.delete("/filmes/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM filmes WHERE id = $1",
            [id]
        );

        res.status(200).json({
            mensagem: "Filme deletado"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao deletar filme"
        });

    }

});

app.post("/filmes", async (req, res) => {
    try {

        const { titulo, genero, ano } = req.body;

         const filmeExiste = await pool.query(
            "SELECT * FROM filmes WHERE titulo = $1",
            [titulo]
        );

        if (filmeExiste.rows.length > 0) {

            return res.status(400).json({
                erro: "Filme já cadastrado"
            });

        }

        const resultado = await pool.query(
            `INSERT INTO filmes (titulo, genero, ano)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [titulo, genero, ano]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar filme"
        });

    }
});

app.get("/filmes", async (req, res) => {
     try {
        const resultado = await pool.query(
            "SELECT * FROM filmes ORDER BY id"
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao buscar filmes"
        });
    }
});

app.post("/filmes", async (req, res) => {
    try {
        const { titulo, genero, ano } = req.body;

        const resultado = await pool.query(
            `INSERT INTO filmes (titulo, genero, ano)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [titulo, genero, ano]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao cadastrar filme"
        });
    }
});

app.post("/avaliacoes", async (req, res) => {
    try {

        console.log(req.body);

        const { filme_id, nota } = req.body;

        const resultado = await pool.query(
            `INSERT INTO avaliacoes (filme_id, nota)
             VALUES ($1, $2)
             RETURNING *`,
            [filme_id, nota]
        );
          console.log(resultado.rows);

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar avaliação"
        });
    }
});

app.get("/ranking", async (req, res) => {
      try {

        const resultado = await pool.query(
        `
        SELECT 
            filmes.titulo,
            AVG(avaliacoes.nota) AS media

        FROM filmes

        JOIN avaliacoes

        ON filmes.id = avaliacoes.filme_id

        GROUP BY filmes.titulo

        ORDER BY media DESC, filmes.titulo ASC
        `
        );


        res.json(resultado.rows);


    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar ranking"
        });

    }

}); 

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});