import bcrypt from "bcrypt";
import * as userModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

//cadastro usuario
export async function register(req, res) {
  try {
    const { nome, email, senha, role } = req.body; //busca os dados no corpo da requisição
    const senhaHash = await bcrypt.hash(senha, 10); //espera o bcrypt criar o hash da senha e armazena
    //cria o usuario chamando o createUser salvando
    //dessa vez a senha esta em senhaHash
    const user = await userModel.createUser(nome, email, senhaHash, role);
    res.status(201).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
}

//login do usuario
export async function login(req, res) {
  try {
     const { email, senha } = req.body;

    // Validar campos obrigatórios 
    if (!email || !senha) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const user = await userModel.findEmail(email);

    // Usuário não encontrado
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    // Senha errada
    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
}
