 import { Router } from 'express';
 // Importamos con los nombres exactos exigidos 
import { 
  getCustomers, 
  getCustomer, 
  createCustomer, 
  updateCustomer 

 } from '../controllers/customer.controller.js';

 import { validateCustomer } from '../middleware/validate-customers.js';
 const router: Router = Router();
 
 router.get('/cliente', getCustomers);
 router.get('/cliente/:id', getCustomer);     
 router.post('/cliente', createCustomer);     
 router.put('/cliente/:id', updateCustomer);  
 
 
 
 
 export default router;