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
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleReject = () => {
    // Handle reject action here
  };

 

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
        { lotNumber: selectedLot, status: completed ? "completed" : "rejected" },
        { withCredentials: true }
      );

      console.log(response);

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
    dataItem.selectedOption.toLowerCase().includes(searchQuery.toLowerCase())||
    dataItem.lotNumber.toLowerCase().includes(searchQuery.toLowerCase())||
    dataItem.challanNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold font-login text-center text-white shadow-lg bg-darkgray rounded-md p-6 hover:scale-105 transition-transform duration-300 w-full">
        Finish Management
      </h1>

      <div className="mt-8 flex flex-col items-center">
      <div>
        <div className="border-[1px] shadow-sm shadow-darkgray h-[165px] w-[400px] lg:w-[500px] rounded-lg overflow-hidden">
          <label
            htmlFor="lotNumber"
            className="block ml-4 mt-4 text-sm font-medium text-gray-700"
          >
            Lot Number
          </label>
          <select
            id="lotNumber"
            className="mt-4 ml-4 focus:ring-darkgray focus:border-darkgray block w-[300px] shadow-sm sm:text-sm border-gray-300 rounded-md"
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
          <div className="bg-darkgray mt-4 h-4 w-full overflow-hidden"></div>
        </div>
      </div>

      <div className="mt-8 flex items-center">
        <input
          type="checkbox"
          id="completed"
          className="h-6 w-6 text-darkgray focus:ring-darkgray border-gray-300 rounded"
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

      <div className="mt-8 flex items-center">
        <input
          type="checkbox"
          id="reject"
          className="h-6 w-6 text-darkgray focus:ring-darkgray border-gray-300 rounded"
          checked={!completed}
          onChange={() => setCompleted(!completed)}
          disabled={!selectedLot}
        />
        <label
          htmlFor="reject"
          className="ml-2 block text-sm font-medium text-gray-700"
        >
          {selectedLot ? "Work Rejected" : "Select Lot Number first to reject"}
        </label>
      </div>

      {completed && (
        <div className="mt-4 border-[1px] shadow-sm shadow-darkgray h-[165px]  w-[400px] lg:w-[500px] rounded-lg overflow-hidden">
          <label
            htmlFor="completionDate"
            className="block text-sm ml-4 mt-4 font-medium text-gray-700"
          >
            Completion Date
          </label>
          <input
            type="text"
            id="completionDate"
            className="mt-4 ml-4 focus:ring-darkgray focus:border-darkgray block w-[300px] shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={completionDate}
            readOnly
          />
          <div className="bg-darkgray mt-4 h-4 w-full overflow-hidden"></div>
        </div>
      )}
      <div className="mt-6 ">
      <button
        type="button"
        className="Inline-flex mt-4  justify-center px-5 py-2 outline text-[18px] font-extrabold font-forget text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray"
        onClick={handleSubmit}
      >
        Submit
      </button>   
      </div>
    </div>


      <div className="mt-12 w-full">
      <div className="w-full mt-6 bg-white border-nav border-2 rounded-lg">
        <div className="lg:flex ml-4 mt-4 justify-between items-center">
          <div className="text-title font-semibold">Finish Issue</div>

          <div className="flex mt-3 lg:mt-0 items-center bg-backgrnd justify-center mr-6 h-[35px] overflow-hidden rounded-full">
            <div>
              <img
                className="h-[24px] w-[24px] ml-5"
                src={require("../assets/stockinSearch.png")}
                alt="Inventory Management System"
              />
            </div>
            <div className="h-[25px] ml-6 border-total border-[1px]"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Party Name..."
              className="mb-4 mt-3 lg:w-[300px]  w-[350px] bg-backgrnd placeholder:text-center border border-none placeholder:font-login placeholder:text-[14px] placeholder:bg-backgrnd placeholder:text-total font-medium"
            />
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center">
            <p
              className="text-gray-800 font-semibold text-lg mt-3 lg:mt-3"
              style={{ color: "#4A90E2" }}
            >
              Sorry, no data available at the moment.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y mt-6 divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-header text-header-font  font-header">
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
              <tbody className="bg-white divide-y divide-login font-header text-[16px] font-medium divide-gray-200">
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
                  ? "bg-darkgray text-white hover:bg-white hover:text-darkgray hover:border-darkgray outline rounded-md hover:rounded-md "
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default FinishIssue;
