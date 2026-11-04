 import express, { type Request, type Response } from "express"; 
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors"
// 1. IMPORTA TU NUEVO ROUTER AQUÍ (Quitamos el pool de aquí porque ya no se usa en index)
import productRouter from './routes/products.routes.js'; 

const port = process.env.PORT; 

const app = express();

// Middlewares 
app.use(express.json());
app.use(cors())

app.use("/api/docs", swaggerRouter) 


app.use('/api', productRouter);

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});