import dotenv from 'dotenv';
import connect from './database/database';
import express from 'express';
import cors from 'cors';
import router from './routes/routeCourses.js';
import routes from './routes/routePagaments.js';
import route from './routes/routelogin';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}));

app.use('/products', router);  //rota dos produtos do ecommerce
app.use('/pagaments', routes); //rota de pagamentos
app.use('/', route);

// criei essa funcao de inicialização do servidor com conexão ao MongoDB
async function iniciar() {
  try {
    // Estabelece conexão com o MongoDB, esse connect vem do database
    await connect();
    console.log('Conexão com MongoDB estabelecida com sucesso!');
    
    //escuta o servidor
    app.listen(3000, () => {
      console.log('Sistema rodando na porta 3000');
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1); //esse process faz parte do node e ele encerra a conexao caso de algum erro
  }
}

// chama a duncao e Inicia a aplicação
iniciar();