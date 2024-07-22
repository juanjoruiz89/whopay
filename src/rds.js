const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'whopay.cnv5h6rlcmbx.us-east-1.rds.amazonaws.com',
    database: 'whopay',
    password: 'hsdfASDFASs',
    port: 5432, // o el puerto configurado en tu instancia RDS
    connectionTimeoutMillis: 10000,
  });


  export const getExpenses = async () => {
    try {
      const res = await pool.query('SELECT * FROM expenses;');
      console.log(res.rows); // Aquí puedes manipular los datos obtenidos
      pool.end();
      return res.rows
    } catch (err) {
      console.error('Error ejecutando la consulta', err);
      console.log(err)
      pool.end();
    }
  };

  const dropTable = async () => {
    const createTableQuery = `
      DROP TABLE expenses;
    `;
  
    try {
      await pool.query(createTableQuery);
      console.log('drop table exitosamente');
    } catch (err) {
      console.error('drop table expenses', err);
    }
  };
  const createTable = async () => {
    const createTableQuery = `
      CREATE TABLE expenses (
        id TEXT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        date DATE NOT NULL,
        status INTEGER NOT NULL
      );
    `;
  
    try {
      await pool.query(createTableQuery);
      console.log('Tabla expenses creada exitosamente');
    } catch (err) {
      console.error('Error al crear la tabla expenses', err);
    }
  };
  const insertExpense = async (expense) => {
    const insertQuery = `
        INSERT INTO expenses (id, name, amount, date, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
  
    try {
      await pool.query(insertQuery, [expense.id, expense.name, expense.amount, expense.date, expense.status]);
      console.log('Insert exitosamente');
    } catch (err) {
      console.error('Error al insertar', err);
    }
  };

  // dropTable();
  // createTable();

  const Expense = {
    id: "257546fb0-ac4a-473f-8476-781b6a57f073",
    name: "Restaurante",
    amount: 35.67,
    date: '2024-07-01',
    status: 2

  }

  //insertExpense(Expense);
  //getExpenses();
