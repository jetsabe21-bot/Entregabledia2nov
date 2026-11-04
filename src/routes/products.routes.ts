import { Router } from 'express';
// Importamos con los nombres exactos exigidos 🚀
import { 
  getMenu, 
  getProduct, 
  createProduct, 
  updateProduct 
} from '../controllers/products.controller.js';

const router: Router = Router();

router.get('/menu', getMenu);
router.get('/menu/:id', getProduct);     
router.post('/menu', createProduct);     
router.put('/menu/:id', updateProduct);  

export default router;