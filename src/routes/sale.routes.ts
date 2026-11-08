import { Router } from 'express';


import { 
  AllSales, 
  saleById, 
  createSale 

 } from '../controllers/sale.controller.js';

 const router: Router = Router();
  
  router.get('/venta', AllSales);
  router.get('/venta/:id', saleById);     
  router.post('/venta', createSale);      
  
  
  
  
  export default router;