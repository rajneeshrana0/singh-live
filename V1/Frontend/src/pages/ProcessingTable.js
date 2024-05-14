import React, { useState, useEffect } from "react";
import axios from "axios";

function ProcessingTable() {
  const [submittedData, setSubmittedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/sales/data/full",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setSubmittedData(response.data);
    } catch (error) {
      console.error("Error fetching submitted data:", error);
    }
  };

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const formatCompletionDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const filteredData = submittedData.filter((dataItem) =>
    dataItem.selectedOption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mt-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Party Name..."
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {filteredData.length === 0 ? (
          <div className="text-center">
            <p
              className="text-gray-800 font-semibold text-lg"
              style={{ color: "#4A90E2" }}
            >
              Sorry, no data available at the moment.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Party Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Challan Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Quality
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Kg
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Meter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Roll
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Process
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Lot Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                    Completion Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((dataItem, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.selectedOption}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.challanNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.kg}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.meter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.roll}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.processTypes.join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.lotNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCompletionDate(dataItem.completionDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="flex justify-center my-4">
              {Array.from({
                length: Math.ceil(filteredData.length / itemsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 mx-1 cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProcessingTable;
