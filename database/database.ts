import { MongoClient } from 'mongodb'; //importei o mongo db
import 'dotenv/config'; //importamos o dotenv para que consiga buscar nossa url no arquivo env

//aqui criei uma variavel que recebe a minha url de conexao do arquivo env
const uri = process.env.MONGO_URI;
//se nao for a url correta a gera a mensagem de erro 
if (!uri) throw new Error('MONGO_URI não definida no .env');

//essa variavel client recebe esse new mongoClient(que e uma instancia para se conctar ao banco/ cria um cliente que representa a conexao) com o paramentro uri que é a variavel que recebe a url
const client = new MongoClient(uri);
//aqui criamos 
async function connect() {
  try {
    await client.connect();// so aqui a conexao e feita de verdade
    console.log('Conectado ao MongoDB!');
    return client.db('ecommerce'); // Retorna a instância do banco de dados// aqui nos entramos nos arquivos do banco// IMPORTANTE: adicionar o nome do banco entre os parenteses
  } catch (err) {
    console.error('Erro ao conectar:', err);
    throw err; // Propaga o erro para quem chamou
  }
}

export default connect;