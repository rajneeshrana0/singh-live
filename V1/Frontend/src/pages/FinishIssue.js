import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FinishIssue = () => {
  const [completed, setCompleted] = useState(false);
  const [completionDate, setCompletionDate] = useState("");
  const [lotOptions, setLotOptions] = useState([]);
  const [selectedLot, setSelectedLot] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/purchase/getFinishProcessData",
        { withCredentials: true }
      );

      const pendingData = response.data.filter(
        (item) => item.status === "pending"
      );

      const lotNumbers = pendingData.map((item) => item.lotNumber);
      setLotOptions(lotNumbers);
      setSubmittedData(pendingData);
    } catch (error) {
      console.error("Error fetching submitted data:", error);
    }
  };

  const handleToggleCompletion = () => {
    if (!selectedLot) {
      alert("Please select a Lot Number first.");
      return;
    }

    setCompleted(!completed);
    if (!completed) {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCompletionDate(formattedDate);
    }
  };

  const handleSubmit = async () => {
    if (!selectedLot) {
      toast.error("Please select a Lot Number first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/sales/add",
        { lotNumber: selectedLot },
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Lot number submitted successfully!");

        const newDataItem = {
          selectedOption: "",
          quantity: "",
          kg: "",
          meter: "",
          roll: "",
          completionDate: completionDate,
        };
        setSubmittedData([...submittedData, newDataItem]);

        setSelectedLot("");
        setCompleted(false);
        setCompletionDate("");
      } else {
        toast.error("Error submitting lot number. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting lot number:", error);

      toast.error("Error submitting lot number. Please try again.");
    }
  };

  const filteredData = submittedData.filter((dataItem) =>
    dataItem.selectedOption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 shadow-lg bg-yellow-400 rounded-md p-6 hover:scale-105 transition-transform duration-300 w-full">
        Finish Management
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="lotNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Lot Number
          </label>
          <select
            id="lotNumber"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={selectedLot}
            onChange={(e) => setSelectedLot(e.target.value)}
          >
            <option value="">Select a Lot Number</option>
            {lotOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex items-center">
        <input
          type="checkbox"
          id="completed"
          className="h-6 w-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          checked={completed}
          onChange={handleToggleCompletion}
          disabled={!selectedLot}
        />
        <label
          htmlFor="completed"
          className="ml-2 block text-sm font-medium text-gray-700"
        >
          {selectedLot ? "Work Completed" : "Select Lot Number first"}
        </label>
      </div>

      {completed && (
        <div className="mt-4">
          <label
            htmlFor="completionDate"
            className="block text-sm font-medium text-gray-700"
          >
            Completion Date
          </label>
          <input
            type="text"
            id="completionDate"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={completionDate}
            readOnly
          />
        </div>
      )}

      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div className="mt-12 w-full">
        <h2 className="text-lg font-semibold mb-4">Finish Issue</h2>
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
                      {Array.isArray(dataItem.processTypes)
                        ? dataItem.processTypes.join(", ")
                        : "-"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {dataItem.lotNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
    </div>
  );
};

export default FinishIssue;
