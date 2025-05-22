import { body } from 'express-validator';

export const registerValidation = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
  body('senha').isLength({ min: 8 }).withMessage('Senha deve ter pelo menos 8 caracteres'),
  body('confirmacaoSenha')
    .custom((value, { req }) => value === req.body.senha)
    .withMessage('As senhas não conferem')
];