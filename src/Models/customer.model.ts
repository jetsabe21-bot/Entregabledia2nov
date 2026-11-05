 import { pool } from "../config/db.js";
 
 export const getAllCustomer = async () => {
   
   const queryText = 'SELECT * FROM cliente'; 
   
   const result = await pool.query(queryText);
   return result.rows;
 };
 export const getCustomerById = async (id: number) => {
   const queryText = 'SELECT * FROM menu WHERE id = $1';
   const result = await pool.query(queryText, [id]);
   
   if (result.rows.length === 0) return null;
   return result.rows[0]; 
 };
 export const insertCustomer = async (name: string, email: string, cellphone: number) => {
   const queryText = `
     INSERT INTO cliente (name, email, cellphone) 
     VALUES ($1, $2, $3) 
     RETURNING *
   `;
   const result = await pool.query(queryText, [name, email, cellphone]);
   return result.rows[0];
 };
 export const updateCustomer = async (id: number, name: string, email: string, cellphone: number) => {
   const queryText = `
     UPDATE cliente 
     SET name = $1, email = $2, cellphone = $3 
     WHERE id = $4 
     RETURNING *
   `;
   const result = await pool.query(queryText, [name, email, cellphone, id]);
   
   if (result.rows.length === 0) return null;
   return result.rows[0];
 };