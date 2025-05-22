# 🛒 E-Commerce API - Backend Documentation

Esta é uma API RESTful desenvolvida com Node.js e TypeScript, voltada para a gestão de um sistema de e-commerce simples. Ela inclui funcionalidades de produtos, autenticação e pagamentos, com segurança JWT aplicada somente à área de pagamentos.

---

## 🔧 Tecnologias Utilizadas

- **Node.js + TypeScript** — Ambiente de execução e tipagem estática
- **Express** — Framework para criação das rotas e middlewares
- **MongoDB** — Banco de dados NoSQL
- **JWT (JSON Web Token)** — Autenticação em rotas de pagamento
- **Express Validator** — Validação de entradas do usuário
- **Jest** — Testes automatizados

---

## 📂 Estrutura do Projeto
```text
backend/
├── src/
│   ├── controllers/
│   │   ├── controllersCourses.ts      # Lógica de produtos
│   │   ├── controllersLogin.ts        # Autenticação (login/registro)
│   │   └── controllersPagaments.ts    # Lógica de pagamentos (com autenticação)
│   ├── middleware/
│   │   ├── authMiddleware.ts          # Middleware JWT (usado apenas em pagamentos)
│   │   ├── validationLogin.ts         # Validação de login
│   │   └── validationRegister.ts      # Validação de registro
│   ├── routes/
│   │   ├── routeCourses.ts            # Rotas de produtos (públicas)
│   │   ├── routelogin.ts              # Rotas de autenticação (públicas)
│   │   └── routePagaments.ts          # Rotas de pagamento (protegidas por JWT)
└── ... (outros arquivos como .env, package.json, etc.)

```

## 🛡️ Como Funciona a Autenticação?

### 🔐 Login

O usuário realiza uma requisição `POST` para `/auth/login`, passando email e senha. Em caso de sucesso, é retornado um token JWT:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

##🔒 Pagamento Protegido

- Para realizar pagamentos, o token JWT deve ser enviado no cabeçalho da requisição:

- Authorization: Bearer <token>

- O middleware authMiddleware.ts valida esse token antes de permitir o processamento da requisição.

## 🧪 Testes
Este projeto utiliza o framework Jest para execução de testes unitários e de integração.
Para rodar os testes:
npm run test

## 1. Clone este repositório:
```text

git clone https://github.com/beatrizvzz-lab/ecommerce---backend.git

```
## 2. Instale as dependências:
```text

cd backend
npm install

```
## 3. Configure o arquivo .env com as variáveis de ambiente necessárias:
```text

MONGO_URI
JWT_SECRET
PORT

```

## 4. Inicie o servidor:
```text

npm run dev

```
