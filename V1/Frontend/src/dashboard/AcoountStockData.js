import React, { useState } from 'react';

const AccountStockOutTable = () => {
  // Dummy data for demonstration
  const [data, setData] = useState([
    {
      partyName: 'Party A',
      lotNumber: 'LOT001',
      challanNumber:'12345',
      quality: 'High',
      kg: '100',
      meter: '200',
      rolls: '10',
    },
    {
      partyName: 'Party B',
      lotNumber: 'LOT002',
      challanNumber:'12345',
      quality: 'Medium',
      kg: '50',
      meter: '150',
      rolls: '5',
    },
    // Add more dummy data here if needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtering the data based on search term
  const filteredData = data.filter(item =>
    item.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.quality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kg.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.rolls.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-semibold">Account Stock Out Data</h1>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/3 py-2 px-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex-grow overflow-auto mt-12">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Party Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Lot Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Challan Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quality</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Kg</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Meter</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rolls</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.partyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lotNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.challanNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quality}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.kg}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.meter}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.rolls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountStockOutTable;
