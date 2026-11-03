import express, { type Request, type Response } from "express"; 
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors"
import pool from './config/db.js';


const port = process.env.PORT; 



const app = express();

// Middlewares 
app.use(express.json());
app.use(cors())

app.use("/api/docs", swaggerRouter) 

app.get('/api/menu', async (req, res) => {
  /* #swagger.tags = ['Menú']
     #swagger.description = 'Obtiene la lista completa de platillos y bebidas del menú.' */
  try {
    
    const result = await pool.query('SELECT * FROM menu');
    
  
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener el menú:', error);
    res.status(500).json({ error: 'Error interno del servidor al consultar el menú.' });
  }
});

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});