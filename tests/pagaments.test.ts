import { insertPagaments } from '../controllers/controllersPagaments';// Importa a função que será testada, que fica no controller de pagamentos
import { Request, Response } from 'express';

// Mock do banco
jest.mock('../database/database', () => ({// Faz um mock (simulação) do módulo de banco de dados
  __esModule: true,// indica que o módulo está usando exportação ES6 (import/export)
  default: jest.fn(() => Promise.resolve({
    collection: () => ({// simula um método .collection() que retorna um objeto com método insertOne
      insertOne: jest.fn(() => Promise.resolve({ insertedId: 'mockedId' }))// simula o insertOne retornando um ID fictício
    })
  }))
}));

describe('insertPagaments', () => {//Cria um grupo de testes com o nome 'insertPagaments'. Tudo dentro dele são testes relacionados a essa função.
  it('deve criar um novo pagamento com sucesso', async () => {//Descreve o primeiro teste: simular a criação de um pagamento válido.
    const req = {//Cria uma requisição simulada (req) com todos os dados necessários no corpo (body). Usa as Request para que o Jest entenda que isso imita um objeto Request do Express.
      body: {
        userId: '123',
        products: [{ productId: 'abc', quantidade: 2 }],
        totaldaCompra: 100,
        MetodoDePagamento: 'pix',
        status: 'pendente'
      }
    } as Request;

    const json = jest.fn();//imula a resposta (res) do Express com os métodos .status() e .json().
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    await insertPagaments(req, res);//Chama a função insertPagaments() com os mocks de req e res.

    expect(status).toHaveBeenCalledWith(201);//Verifica se o código de status 201 (criado) foi retornado.
    expect(json).toHaveBeenCalledWith(expect.objectContaining({//Verifica se o JSON de resposta contém os dados esperados, incluindo o _id retornado pelo mock do banco.
      userId: '123',
      totaldaCompra: 100,
      _id: 'mockedId'
    }));
  });

  it('deve retornar erro se campos obrigatórios faltarem', async () => {//Descreve o segundo teste: simular uma requisição com dados faltando.
    const req = {//Cria uma requisição incompleta para testar a validação.
      body: {
        products: [{ productId: 'abc', quantidade: 2 }],
        MetodoDePagamento: 'pix',
        status: 'pendente'
      }
    } as Request;

    const json = jest.fn();//Simula a resposta do Express (mesmo esquema do teste anterior).
    const status = jest.fn(() => ({ json }));
    const res = { status } as unknown as Response;

    await insertPagaments(req, res);//Chama a função com a requisição inválida.

    expect(status).toHaveBeenCalledWith(400);//Verifica se o status 400 (erro de requisição) foi retornado.
    expect(json).toHaveBeenCalledWith({ error: "Campos obrigatórios faltando" });//Verifica se a resposta contém a mensagem de erro apropriada.
  });
});
