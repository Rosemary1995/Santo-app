import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { backendUrl } from '../backend/backend';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState([]); // Replace with your actual data or API call


  useEffect(() => {
    const fetchPayments = async () => {
      const response = await fetch(`${backendUrl}/api/payments`);
      const data = await response.json();
      setPayments(data?.payments);
      console.log(data);
    };
    fetchPayments();

  }, []);
  const filteredPayments = payments.filter(payment => 
    payment?.book?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Payment History</h1>
      
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search payments..."
          className="w-full p-2 pl-10 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayments.map((payment, index) => (
              <tr key={payment.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{payment?.book?.title}</td>
                <td className="px-6 py-4">${payment?.book?.bookingCost}</td>
                <td className="px-6 py-4">{new Date(payment?.paymentDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">


                  <span className={`px-2 py-1 rounded ${
                    payment?.paymentStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                    payment?.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>

                    {payment?.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
