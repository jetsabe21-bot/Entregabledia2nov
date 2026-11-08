 import { pool } from "../config/db.js";


 export const getAllSales = async () => {
   
   const queryText = 'SELECT * FROM venta'; 
   
   const result = await pool.query(queryText);
   return result.rows;
 };

 export const getsaleById = async (id: number) => {
   const queryText = 'SELECT * FROM venta WHERE id = $1';
   const result = await pool.query(queryText, [id]);
   
   if (result.rows.length === 0) return null;
   return result.rows[0]; 
 };
//* fue necesario indicar su valor para que no marcara rojo. NO puede ser any...
 export const insertsale = async (id_cliente: number, id_menu: number, cantidad: number, total: number) => {
   const queryText = `
     INSERT INTO venta (id_cliente, id_menu, cantida, total) 
     VALUES ($1, $2, $3) 
     RETURNING *
   `;
   const result = await pool.query(queryText, [id_cliente, id_menu, cantidad, total]);
   return result.rows[0];
 };
 