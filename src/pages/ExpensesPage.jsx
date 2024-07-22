import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { UserCard } from "../components/UserCard";
import { ExpenseTable } from "../components/ExpenseTable";
import { UploadExpenseForm } from '../components/UploadExpenseForm';
import axios from 'axios';
import { getExpenses } from '../rds'
const { Pool } = require('pg');


export const ExpensesPage = (state) => {
  const { userData, setUserData } = useContext(UserContext);
  const [expenseData, setExpenseData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  // const getExpenses = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:3000/api/expenses');
  //     console.log(res.rows); // Aquí puedes manipular los datos obtenidos
  //   } catch (err) {
  //     console.error('Error ejecutando la consulta', err);
  //     console.log(err)
  //   }
  // };
    useEffect(() => {
      const fetchExpenseData = async () => {
        //console.log(expendata)
        axios.get("https://97hexm90z8.execute-api.us-east-1.amazonaws.com/t1/data", {
          headers: {
          }
      })
        .then((response) => {
          console.log('Respuesta de la API:', response); //response.data
          setExpenseData(JSON.parse(response.data.body));
          console.log(JSON.parse(response.data.body))
        })
        .catch((error) => {
          console.error('Error al enviar archivo:', error);
        });
      };
  
      fetchExpenseData();
    }, []);

  
  return (
    <div>
      <div className="expenses-title">
        <div>
          <h1>Hello {state.user.attributes.name}!</h1>{/* <h1>Hello {UserData.name}!</h1> */}
          <h3>Welcome to your expenses overview</h3>
        </div>
        <UserCard user={state.user.attributes}/>
      </div>
      <div className='expenses-content'>
        <div className='expenses-content-title'>
          <h4>Expenses</h4>
          <button className='button-29' onClick={openPopup}>+ Add Expense</button>
        </div>
        {isOpen && 
          <div className="popup-overlay">
              <UploadExpenseForm closePopUp={() => closePopup()}/>
          </div>
        }
        <ExpenseTable id={state.user.attributes.sub}/>
      </div>
    </div>
  );
};
