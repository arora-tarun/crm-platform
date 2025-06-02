import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get('https://crm-frontend-s759.onrender.com/api/customers', { withCredentials: true });
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (err) {
        setError('Failed to load customers. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers by name or email based on searchTerm
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(lowerSearch) ||
        customer.email.toLowerCase().includes(lowerSearch)
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  if (loading) {
    return <div className="container mt-4">Loading customers...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customer List</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredCustomers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total Spend</th>
              <th>Visits</th>
              <th>Last Purchase</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>₹{customer.totalSpend?.toLocaleString() || '0'}</td>
                <td>{customer.visits || 0}</td>
                <td>{customer.lastPurchase ? new Date(customer.lastPurchase).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerList;
