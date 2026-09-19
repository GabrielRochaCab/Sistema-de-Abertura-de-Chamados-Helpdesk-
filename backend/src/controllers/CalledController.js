import * as calledModel from "../models/CalledModel.js";

//cria chamado
export async function createCalled(req, res) {
  try {
    const { titulo, descricao, categoria, prioridade } = req.body;
    const cliente_id = req.user.id;

    // valida se quem está pedindo é realmente um cliente
    if (req.user.role !== "cliente") {
      return res
        .status(403)
        .json({ erro: "Apenas clientes podem abrir chamados" });
    }
    // valida campos obrigatórios
    if (!titulo || !descricao) {
      return res
        .status(400)
        .json({ erro: "Título e descrição são obrigatórios" });
    }

    const newCalled = await calledModel.createCalled(
      titulo,
      descricao,
      categoria,
      prioridade,
      cliente_id,
    );

    return res.status(201).json(newCalled);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao criar chamado" });
  }
}

//listar chamados
export async function listCall(req, res) {
  try {
    const userId = req.user.id;
    const userType = req.user.role;
    let userCalls;
    if (userType === "cliente") {
      userCalls = await calledModel.findByClient(userId);
    } else if (userType === "atendente") {
      userCalls = await calledModel.listAll();
    } else {
      return res.status(403).json({ erro: "Tipo de usuário inválido" });
    }

    return res.status(200).json(userCalls);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao listar chamados" });
  }
}

export async function claimCall(req, res) {
  try {
    const callId = req.params.id;
    const agentId = req.user.id;

    if (req.user.role !== "atendente") {
      return res.status(403).json({ erro: "Apenas atendentes podem assumir chamados" });
    }

    const updatedCall = await calledModel.AcceptCall(callId, agentId);

    if (!updatedCall) {
      return res.status(404).json({ erro: "Chamado não encontrado" });
    }

    return res.status(200).json(updatedCall);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao assumir chamado" });
  }
}


export async function changeStatus(req, res) {
  try {
    const callId = req.params.id;
    const { status } = req.body;
    const validStatuses = ["aberto", "em_andamento", "fechado"];

    if (req.user.role !== "atendente") {
      return res.status(403).json({ erro: "Apenas atendentes podem alterar o status" });
    }

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ erro: "Status inválido" });
    }

    const updatedCall = await calledModel.updateStatus(callId, status);

    if (!updatedCall) {
      return res.status(404).json({ erro: "Chamado não encontrado" });
    }

    return res.status(200).json(updatedCall);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao atualizar status" });
  }
}
