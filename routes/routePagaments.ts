
 import { Router } from 'express';
 import { insertPagaments, findPgaments, updatePagaments } from '../controllers/controllersPagaments.js';
 import { authenticate } from '../middleware/authMiddleware.js';
 

 const routes = Router();// cria um agrupador de rotas
 routes.post('/', authenticate, (req, res, next) =>{ 
    insertPagaments(req,res).catch(next)
 });
 routes.get('/:id', authenticate, (req, res, next) =>{
    findPgaments(req,res).catch(next)});
 routes.put('/:id', authenticate, (req, res, next) =>{
    updatePagaments(req,res).catch(next)})

 export default routes;