import * as calledModel from "../models/CalledModel.js";

//cria chamado
export async function createCalled(req, res) {
  try {
    const { titulo, descricao, categoria, prioridade } = req.body;
    const cliente_id = req.user.id;

    const newCalled = await calledModel.createCalled(
      titulo,
      descricao,
      categoria,
      prioridade,
      cliente_id,
    );

    return res.status(201).json(newCalled);
  } catch(error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao criar chamado" });
  }
}

//listar chamados

