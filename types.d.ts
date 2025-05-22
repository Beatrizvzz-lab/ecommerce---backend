
import 'express';// Importa os tipos do Express para estender depois

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string; // ou number, dependendo do tipo do seu ID
  }
}

// Isso é necessário para que o TypeScript aceite `req.userId` no seu middleware e nas rotas protegidas