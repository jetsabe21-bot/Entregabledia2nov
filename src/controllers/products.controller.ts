 import type { Request, Response } from 'express';
import { 
  getAllProducts, 
  getProductById, 
  insertProduct, 
  updateProduct as updateProductInDb
} from '../Models/product.model.js';


export const getMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts(); 
    res.status(200).json(products);          
  } catch (error) {
    console.error('Error en getMenu:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
export const getProduct = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['Menú']
     #swagger.description = 'Retorna un producto por su id' */
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    
    
    if (!product) {
      res.status(404).json({ error: 'Not Found', message: 'El producto no existe.' });
      return;
    }
    
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error en getProduct:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


export const createProduct = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['Menú']
     #swagger.description = 'Crea un nuevo producto' */
  try {
   
    const { name, description, price } = req.body;
    
    
    const newProduct = await insertProduct(name, description, price);
    
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error en createProduct:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['Menú']
     #swagger.description = 'Actualiza un producto existente' */
  try {

    const id = parseInt(req.params.id);
    const { name, description, price } = req.body;


    const updatedProduct = await updateProduct(id, name, description, price);

    if (!updatedProduct) {
      res.status(404).json({ error: 'Not Found', message: 'El producto no existe para actualizar.' });
      return;
    }

    
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error en updateProduct:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};