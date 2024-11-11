import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [verifiedTransactions, setVerifiedTransactions] = useState([]);

  useEffect(() => {
    // Fetch pending transactions
    axios.get('https://localhost:443/api/transactions/pending')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => console.error('Error fetching transactions', error));
  }, []);

  const handleVerify = (id) => {
    setVerifiedTransactions(prevState => [...prevState, id]);
  };

  const handleSubmit = () => {
    axios.post('https://localhost:443/api/transactions/submit-to-swift', { verifiedTransactions })
      .then(() => {
        setTransactions(transactions.filter(tx => !verifiedTransactions.includes(tx.id)));
        setVerifiedTransactions([]);
      })
      .catch(error => console.error('Error submitting transactions', error));
  };

  return (
    <div className="dashboard">
      <h2>International Payments Portal</h2>
      <h3>Pending Transactions</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <span>{transaction.payeeName}</span> - SWIFT Code: {transaction.swiftCode}
            <button 
              onClick={() => handleVerify(transaction.id)}
              style={{ backgroundColor: verifiedTransactions.includes(transaction.id) ? 'green' : 'gray' }}
            >
              Verified
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit to SWIFT</button>
    </div>
  );
};

export default EmployeeDashboard;
