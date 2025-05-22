import {Router} from 'express';
import { getProducts, postProduct, getProductById } from '../controllers/controllersCourses.js';
//import { authenticate } from '../middleware/authMiddleware.js';


const router = Router();
router.get('/', getProducts );
router.post('/', postProduct);
router.get('/:id', (req, res, next) => {
    getProductById(req, res).catch(next);
});

export default router;