import { NextFunction, Request, Response, Router} from "express";
import { login, register } from "../controllers/controllersLogin";
//import { authenticate } from '../middleware/authMiddleware';
//import { loginValidation } from "../middleware/validationLogin";
import { registerValidation } from "../middleware/validationRegister";

const route = Router();
route.post('/register', registerValidation, (req:Request, res:Response, next:NextFunction) =>{
    register(req,res).catch(next)});
route.post('/login', registerValidation, (req: Request, res:Response, next:NextFunction) =>{
    login(req,res).catch(next)});


export default route;