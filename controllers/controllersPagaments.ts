import { Request, Response } from "express";
import  connect  from "../database/database";
import { ObjectId } from "mongodb";
import { Pagaments } from "../models/modelPagaments";

// aqui estou iniciando a conexão com o banco de dados
let dbPromise = connect();

//função assíncrona para criar um novo produto
export const insertPagaments = async (req: Request, res: Response):Promise <Response> => {
  try {
    const db = await dbPromise;
    const pagamento: Pagaments = {//criei um objeto que vai copiar tudo que tem no corpo da requisição // esse pagaments vem do model da interface que eu criei 
        ...req.body,
        createdAt: new Date(),//aqui vamos adicionar a data atual 
      };
    // Validação simples 
    if (!pagamento.userId || !pagamento.totaldaCompra) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
      }
      const result = await db.collection("pagaments").insertOne(pagamento);//insere um novo pagamento 
      return res.status(201).json({...pagamento, _id: result.insertedId });//retorna o produto e o id 
  } catch (error) {
        return res.status(500).json({ error: "Erro ao gerar pagamento" });
  }
};
//aqui criei uma funcao que busca os produtos pelo id 
export const findPgaments = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Aguarda a conexão com o banco
    const db = await dbPromise;
    const { id } = req.params;
    // Busca o produto na coleção "products" usando o ID convertido para ObjectId
    const pagamento = await db.collection("pagaments").findOne({ _id: new ObjectId(id) });
    // Se não encontrar o pagamento, retorna erro 404
    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }
     return res.status(200).json(pagamento);
  } catch (error) {
     return res.status(500).json({ error: "Erro ao buscar pagamento por ID" });
  }
};
export const updatePagaments = async (req: Request, res: Response): Promise<Response>  => {
    try {
      // Aguarda a conexão com o banco
      const db = await dbPromise;
      const { id } = req.params;
      const {status} = req.body
       // Verifica se o status é válido
      const statusValidos = ["pendente", "pago", "cancelado"];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({ error: "Status inválido" });
    }
        // Busca o produto na coleção "pagaments" usando o ID convertido para ObjectId
      const result = await db.collection("pagaments").updateOne( { _id: new ObjectId(id) },
        { $set: { status } }
      );
         // Se não encontrar o produto, retorna erro 404
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Pagamento não encontrado" });
      }
         return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar pagamento por ID" });
    }
  };
  

