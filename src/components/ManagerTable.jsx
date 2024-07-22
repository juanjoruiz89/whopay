import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ManagerTable = (state) => {
  let example = [{
    name: "Restaurant",
    amount: 37.13,
    date: "12/06/2024",
    status: 0 // 0 - Pending approval, 1 - Approved, 2 - Denied
  },
  {
    name: "Travel",
    amount: 112.78,
    date: "06/07/2024",
    status: 1 // 0 - Pending approval, 1 - Approved, 2 - Denied
  },
  {
    name: "Dinner",
    amount: 67.46,
    date: "08/07/2024",
    status: 2 // 0 - Pending approval, 1 - Approved, 2 - Denied
  }
  ]
  let statusGuide = {
    0: "Pending approval",
    1: "Approved",
    2: "Denied"
  }

  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const fetchExpenseData = async () => {
    axios.get(("https://97hexm90z8.execute-api.us-east-1.amazonaws.com/t1/data?type="+"manager_expenses"+"&id="+state.id), {
      headers: {
      }
  })
    .then((response) => {
      console.log('Respuesta de la API:', response.data); //response.data
      setData(response.data);
      //console.log(JSON.parse(response.data.body))
    })
    .catch((error) => {
      //console.error('Error al enviar archivo:', error);
    });
  };
  useEffect(() => {
    fetchExpenseData();
  }, []);

  const acceptDeny = (accept,expense_id) => {
    const status = accept ? 1 : 2;
    axios.post(("https://g1b71qihyc.execute-api.us-east-1.amazonaws.com/test"+"?expense_id="+expense_id+"&expense_status="+status), { //UserData.id
      headers: {
          'Content-Type': 'image/png' //'application/octet-stream' // Tipo MIME para archivos binarios
      },
    })
    .then((response) => {
      console.log('Respuesta de la API:', response); //response.data
      fetchExpenseData();
    })
    .catch((error) => {
      console.error('Error al enviar archivo:', error);
    });
  }


  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...data].sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
      }
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig.key) {
      return;
    }
    return sortConfig.key === name ? `sort-${sortConfig.direction}` : undefined;
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
  };

  return (
    <div className="expense-table">
      <div onClick={fetchExpenseData}><span className='fa fa-refresh'></span></div>
      <table>
        <thead>
          <tr>
            <th scope="col" onClick={() => sortData('name')} className={getClassNamesFor('name')}>Name</th>
            <th scope="col" onClick={() => sortData('amount')} className={getClassNamesFor('amount')}>Amount</th>
            <th scope="col" onClick={() => sortData('date')} className={getClassNamesFor('date')}>Date</th>
            <th scope="col" onClick={() => sortData('employee')} className={getClassNamesFor('employee')}>Employee</th>
            <th scope="col" onClick={() => sortData('status')} className={getClassNamesFor('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((e, i) => (
            <tr key={i}>
              <td>{e.name}</td>
              <td>{formatCurrency(e.amount)}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>{e.name}</td>
              <td>
                <a onClick={() => {acceptDeny(true,e.id)}} class="accept">accept <span class="fa fa-check"></span></a>
                <a onClick={() => {acceptDeny(false,e.id)}} class="deny">deny <span class="fa fa-close"></span></a>
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
};
