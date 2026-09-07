import 'dotenv/config';
import express from 'express';
import pool from './config/db.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

pool.query('SELECT NOW()')
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro fatal: Falha ao conectar no banco de dados:', error);
    });