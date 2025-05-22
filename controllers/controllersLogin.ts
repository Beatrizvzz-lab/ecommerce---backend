import { Request, Response } from "express";
import connect from "../database/database";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { generateToken } from "../utils/JWT";
import { ObjectId } from "mongodb";

let conexao = connect();

export const login = async (req: Request,res: Response): Promise<Response | undefined> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = await conexao;
    const { email, senha } = req.body;

    const usuario = await db.collection("usuarios").findOne({ email });
    if (!usuario|| !(await bcrypt.compare(senha, usuario.senha) )) {
      return res.status(400).json({ mensagem: "E-mail ou senha incorretos" });
    }
    const token = generateToken(usuario._id.toString()); // Gera o token com o ID do usuário
    return res.status(200).json({ mensagem: "Login realizado com sucesso!", token });
  } catch (error) {console.error(error);
    return res.status(500).json({ error: "Erro ao logar na plataforma, tente novamente!" });
  }
};

export const register = async (req: Request,res: Response): Promise<Response | undefined> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const bd = await conexao;
    const { nome, email, telefone, senha, confirmacaoSenha } = req.body;
    if (!nome || !email || !telefone || !senha || !confirmacaoSenha) {
      return res.status(400).json("Dados para cadastro invalidos");
    } else if (senha !== confirmacaoSenha) {
      return res.status(400).json("As senhas não conferem");
    }

    const usuarioExistente = await bd.collection("usuarios").findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json("E-mail já cadastrado");
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await bd.collection("usuarios").insertOne({
      nome,
      email,
      telefone,
      senha: senhaCriptografada,
    });
    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao se cadastrar na plataforma, tente novamente!" });
  }
};
