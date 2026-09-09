import pool from '../config/db.js';

export async function createUser(nome, email, senhaHash, role) {
    const result = await pool.query( 
        'INSERT INTO usuarios (nome, email, senha_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [nome, email, senhaHash, role]
    );
    return result.rows[0];
}

export async function findEmail(email) {
    const resultado = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );
    return resultado.rows[0];
}
