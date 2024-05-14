import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { Link } from "react-router-dom";

function GreyStockIn() {
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/all",
        {
          withCredentials: true,
        }
      );
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setSubmittedData(sortedData.reverse());
    } catch (error) {
      console.error("Error fetching submitted data:", error);
    }
  };
  
  

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const handleAddButtonClick = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredData = submittedData.filter((dataItem) =>
    dataItem.selectedOption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataItem.challanNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData
  .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mt-6">
        <div className="mt-12 w-full bg-white border-nav border-2 rounded-lg">
          <div className="lg:flex ml-4 mt-4 justify-between items-center ">
            <div className="text-title font-bold">
              Grey Stock IN <br /> Total:7
            </div>
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
                className="text-gray-800 font-semibold text-lg"
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
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[14px] uppercase">
                      Party Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[14px] uppercase">
                      Challan Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[14px] uppercase">
                      Quality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[14px] uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-login font-header text-[16px] font-medium divide-gray-200">
                  {currentItems.map((dataItem, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-white"}
                    >
                      <td className="px-6 py-2 whitespace-nowrap">
                        {dataItem.selectedOption}
                      </td>
                      <td className="px-9 py-2 whitespace-nowrap">
                        {dataItem.challanNumber}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {dataItem.quantity
                          .join(", ")
                          .split(", ")
                          .map((item, index) => (
                            <div key={index}>{item.trim()}</div>
                          ))}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap">
                        <button
                          className="bg-darkgray hover:bg-white text-white hover:text-darkgray hover:border-darkgray outline hover:outline-2 font-semibold px-4 py-2 rounded-md"
                          onClick={() => handleAddButtonClick(dataItem)}
                        >
                          Add
                        </button>
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
                    ? "bg-darkgray text-white hover:bg-white hover:text-darkgray hover:border-darkgray outline hover:outline-2 rounded-md hover:rounded-md "
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedData} />
    </div>
  );
}

export default GreyStockIn;
