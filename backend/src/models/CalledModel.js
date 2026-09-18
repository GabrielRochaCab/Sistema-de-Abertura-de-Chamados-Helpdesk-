import pool from "../config/db.js";

//função que cria um chamado
export async function createCalled(
  titulo,
  descricao,
  categoria,
  prioridade,
  cliente_id,
) {
  const result = await pool.query(
    "INSERT INTO chamados (titulo, descricao, categoria, prioridade, cliente_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [titulo, descricao, categoria, prioridade, cliente_id],
  );
  return result.rows[0];
}

//listar chamados de um cliente
export async function findByClient(cliente_id) {
  const result = await pool.query(
    "SELECT * FROM chamados WHERE cliente_id = $1",
    [cliente_id],
  );
  return result.rows;
}

//busca por um chamado especifico
export async function findById(chamado_id) {
  const result = await pool.query("SELECT * FROM chamados WHERE id = $1", [
    chamado_id,
  ]);
  return result.rows[0];
}

//listar todos os chamados
export async function listAll() {
  const result = await pool.query("SELECT * FROM chamados");
  return result.rows;
}

//funcao para atendente assumir um chamado
export async function AcceptCall(chamado_id, atendente_id) {
  const result = await pool.query(
    "UPDATE chamados SET atendente_id = $1 WHERE id = $2 RETURNING *",
    [atendente_id, chamado_id],
  );
  return result.rows[0];
}

//atualiza status da demanda
export async function updateStatus(chamado_id, novo_status) {
  const result = await pool.query(
    "UPDATE chamados SET status = $1 WHERE id = $2 RETURNING *",
    [novo_status, chamado_id],
  );
  return result.rows[0];
}
