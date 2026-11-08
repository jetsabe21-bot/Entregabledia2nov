 import { pool } from "../config/db.js";

export const getAllProducts = async (maxPrice?: number, page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;


  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    const queryText = 'SELECT * FROM menu WHERE price <= $1 LIMIT $2 OFFSET $3';
    const result = await pool.query(queryText, [maxPrice, limit, offset]);
    return result.rows;
  }

 
  const queryText = 'SELECT * FROM menu LIMIT $1 OFFSET $2';
  const result = await pool.query(queryText, [limit, offset]);
  return result.rows;
};
export const getProductById = async (id: number) => {
  const queryText = 'SELECT * FROM menu WHERE id = $1';
  const result = await pool.query(queryText, [id]);
  
  if (result.rows.length === 0) return null;
  return result.rows[0]; 
};
export const insertProduct = async (name: string, description: string, price: number) => {
  const queryText = `
    INSERT INTO menu (name, description, price) 
    VALUES ($1, $2, $3) 
    RETURNING *
  `;
  const result = await pool.query(queryText, [name, description, price]);
  return result.rows[0];
};
export const updateProduct = async (id: number, name: string, description: string, price: number) => {
  const queryText = `
    UPDATE menu 
    SET name = $1, description = $2, price = $3 
    WHERE id = $4 
    RETURNING *
  `;
  const result = await pool.query(queryText, [name, description, price, id]);
  
  if (result.rows.length === 0) return null;
  return result.rows[0];
};