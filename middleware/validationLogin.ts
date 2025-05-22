import { body } from 'express-validator';

export const loginValidation = [
  body('email')
    .isEmail().withMessage('E-mail inválido'),
  body('senha')
    .isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
];
