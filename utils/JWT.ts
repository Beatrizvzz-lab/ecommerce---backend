//jwt serve para validar os usúarios que realizam o login na plataforma 

import jwt from 'jsonwebtoken';// Importa a biblioteca jsonwebtoken para gerar e validar tokens

const SECRET_KEY = process.env.JWT_SECRET;// Lê a chave secreta do arquivo .env (usada para assinar/verificar tokens)

if (!SECRET_KEY) {
    throw new Error('JWT_SECRET não está definido no arquivo .env');// Se a chave não estiver definida, lança erro logo no início
  }
export const generateToken = (userId: string) => {// Função que gera um token JWT contendo o userId e expira em 1 hora
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): { userId: string } | null => {// Função que verifica o token:
// - Se válido, retorna o objeto com userId
// - Se inválido, retorna null
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    return decoded;
  } catch (error) {
    return null;
  }
};