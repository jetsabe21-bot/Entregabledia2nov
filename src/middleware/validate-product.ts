 import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// schema de Zod con las reglas exigidas
const productSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio y no puede estar vacío" }),
  description: z.string().min(1, { message: "La descripción es obligatoria y no puede estar vacía" }),
  price: z.number().positive({ message: "El precio debe ser un número positivo (mayor a cero)" }),
  
  cost: z.number().nonnegative({ message: "El costo debe ser mayor o igual a cero" }).optional(),
  
  stock: z.number().int({ message: "El stock debe ser un número entero" }).nonnegative({ message: "El stock debe ser mayor o igual a cero" }).optional(),
});


export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
 
  const result = productSchema.safeParse(req.body);

  
    res.status(400).json({
      error: 'Bad Request',
     
    });
    return; 

  
  next();
};