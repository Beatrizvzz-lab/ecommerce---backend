import { Request, Response, NextFunction} from 'express';
import { verifyToken } from '../utils/JWT';// Importa a função verifyToken que valida e decodifica o JWT

export const authenticate = (req:Request, res: Response, next: NextFunction): void =>{// Exporta uma função chamada authenticate, que é o middleware de autenticação
    const authHeader = req.headers.authorization;// Pega o cabeçalho 'Authorization' da requisição (geralmente vem como: "Bearer token123")
    if (!authHeader) {
    res.status(401).json({ mensagem: 'Token não fornecido' });// Se o token não estiver presente, responde com erro 401 (não autorizado)
     return
  }

  const token = authHeader.split(' ')[1];// Divide a string "Bearer token" e pega só a segunda parte: o token
  const decoded = verifyToken(token);// Verifica e decodifica o token usando a função verifyToken

  if (!decoded) {
    res.status(401).json({ mensagem: 'Token inválido' });// Se a verificação falhar, responde com erro 401 (token inválido)
     return
  }

  req.userId = decoded.userId; // Se der tudo certo, injeta o ID do usuário na requisição (req.userId) para ser usado depois
  next();// Chama o próximo middleware ou rota
};
