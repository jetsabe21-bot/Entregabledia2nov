  import type { Request, Response, NextFunction } from 'express';
 import { email, z } from 'zod';
 
 // schema de Zod con las reglas exigidas
 const customerSchema = z.object({
   name: z.string().min(1, { message: "El nombre es obligatorio y no puede estar vacío" }),
   email: z.string().min(1, { message: "Direccion de email es obligatorio y no puede estar vacio" }),
   cellphone: z.number().positive({ message: "El numero de telefono es obligatorio y no puede estar vacio" }),
   
 });
 
 
 export const validateCustomer = (req: Request, res: Response, next: NextFunction): void => {
  
   const result = customerSchema.safeParse(req.body);
 
   
     res.status(400).json({
       error: 'Bad Request',
      
     });
     return; 
 
   
   next();
 };