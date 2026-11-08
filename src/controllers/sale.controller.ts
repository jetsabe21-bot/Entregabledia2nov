import type { Request, Response } from 'express';
import { id } from 'zod/v4/locales';
import { 
  getAllSales, 
  getsaleById, 
  insertsale, 
} from '../Models/sale.model.js';
  


export const AllSales = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['venta']
     #swagger.description = 'Retorna todas las ventas registradas' */
  try {
    const sale = await getAllSales(); 
    res.status(200).json(sale);          
  } catch (error) {
    console.error('Error en getSales:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
  
export const saleById = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['venta']
     #swagger.description = 'Retorna una venta por su id' */
  try {
    const id = parseInt(Array.isArray(req.query.id) ? req.query.id[0] as string : (req.query.id as string || ''));

    const sale = await getsaleById(id);
    
    if (!sale) {
      res.status(404).json({ error: 'Not Found', message: 'Esta venta no existe.' });
      return;
    }
    
    res.status(200).json(sale);
  } catch (error) {
    console.error('Error en getsaleById:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
export const createSale = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['venta']
     #swagger.description = 'Crea una nueva venta' */
  try {
   
    const { id_cliente, id_menu, cantidad, total } = req.body;
    
    const newsale = await insertsale(id_cliente, id_menu, cantidad, total);
    
    res.status(201).json(newsale);
  } catch (error) {
    console.error('Error en createSale:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};