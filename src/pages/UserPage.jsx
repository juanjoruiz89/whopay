import { useState } from "react";
import { UploadExpenseForm } from "../components/UploadExpenseForm";
import { ExpenseTable } from "../components/ExpenseTable";

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'whopay.cnv5h6rlcmbx.us-east-1.rds.amazonaws.com',
  database: 'whopay',
  password: 'hsdfASDFASs',
  port: 5432, // o el puerto configurado en tu instancia RDS
});

// Ejemplo de una consulta SELECT
const getUsers = async () => {
  try {
    const res = await pool.query('SELECT * FROM users');
    console.log(res.rows); // Aquí puedes manipular los datos obtenidos
  } catch (err) {
    console.error('Error ejecutando la consulta', err);
  } finally {
    pool.end(); // Finaliza el pool de conexiones
  }
};

const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE expenses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      date DATE NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Tabla expenses creada exitosamente');
  } catch (err) {
    console.error('Error al crear la tabla expenses', err);
  } finally {
    pool.end(); // Finaliza el pool de conexiones
  }
};


export const UserPage = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);

  
  return (
    <div>
      <h3>User Page</h3>
      <div>This page is for authenticated users</div>
      <button onClick={() => setPopUpOpen(true)}>Add expense</button> {popUpOpen ? <UploadExpenseForm closePopUp={() => setPopUpOpen(false)} /> : null}
      <ExpenseTable/>
      <button>createTable</button>
    </div>
  );
};
