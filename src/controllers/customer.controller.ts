import type { Request, Response } from 'express';
import { 
  getAllCustomer, 
  getCustomerById, 
  insertCustomer, 
  updateCustomer as updateCustomerInDb
} from '../Models/customer.model.js';

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['Clientes']
     #swagger.description = 'Retorna todos los clientes registrados' */
  try {
    const customers = await getAllCustomer(); 
    res.status(200).json(customers);          
  } catch (error) {
    console.error('Error en getCustomers:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getCustomer = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['Clientes']
     #swagger.description = 'Retorna un cliente por su id' */
  try {
    const id = parseInt(Array.isArray(req.query.id) ? req.query.id[0] as string : (req.query.id as string || ''));

    const customer = await getCustomerById(id);
    
    if (!customer) {
      res.status(404).json({ error: 'Not Found', message: 'El cliente no existe.' });
      return;
    }
    
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error en getCustomer:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['Clientes']
     #swagger.description = 'Crea un nuevo cliente' */
  try {
   
    const { name, email, cellphone } = req.body;
    
    const newCustomer = await insertCustomer(name, email, cellphone);
    
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error en createCustomer:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  /* #swagger.tags = ['Clientes']
     #swagger.description = 'Actualiza un cliente existente' */
  try {
    const id = parseInt(Array.isArray(req.query.id) ? req.query.id[0] as string : (req.query.id as string || ''));

    const { name, email, phone } = req.body;

    const updatedCustomer = await updateCustomerInDb(id, name, email, phone);

    if (!updatedCustomer) {
      res.status(404).json({ error: 'Not Found', message: 'El cliente no existe para actualizar.' });
      return;
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error en updateCustomer:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};