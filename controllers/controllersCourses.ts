
import { Request, Response } from "express";
import  connect  from "../database/database";
import { ObjectId } from "mongodb";


// aqui estou iniciando a conexão com o banco de dados 
let dbPromise = connect();

//aqui defini uma função assíncrona que lida com a rota GET para listar todos os produtos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const db = await dbPromise; // Aguarda a conexão com o banco de dados
    const products = await db.collection("Products").find().toArray();//busca todos os products, convertendo em array/lista
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
};
//função assíncrona para criar um novo produto
export const postProduct = async (req: Request, res: Response) => {
  try {
    const db = await dbPromise;

    req.body.createdAt = new Date(); // adiciona a data direto no body

    const result = await db.collection("Products").insertOne(req.body);//está acessando a coleção "products" do banco (como se fosse uma "tabela" de produtos).insere um novo produto a tabela
    res.status(201).json({...req.body, _id: result.insertedId });//cria todos os dados q foram mandados pela requisao + o id criado pelo mongodb atraves do insertdid
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

//aqui criei uma funcao que busca os produtos pelo id 
export const getProductById = async (req: Request, res: Response) => {
  try {
    // Aguarda a conexão com o banco
    const db = await dbPromise;
    const { id } = req.params;
    // Busca o produto na coleção "products" usando o ID convertido para ObjectId
    const product = await db.collection("Products").findOne({ _id: new ObjectId(id) });//Quero o produto cujo _id é igual a esse id que recebi.//findOne faz uma busca especifica
// Se não encontrar o produto, retorna erro 404
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto por ID" });
  }
};
