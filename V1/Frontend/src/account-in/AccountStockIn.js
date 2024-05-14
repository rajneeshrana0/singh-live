import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [challanNumber, setChallanNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [kg, setKg] = useState("");
  const [meter, setMeter] = useState("");
  const [roll, setRoll] = useState("");
  const [lotNumber, setLotNumber] = useState("");
 

  const options = ["Rajneesh Rana", "Liza Ahuja", "Nitish Kumar"];
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

const notify = () => toast("Data Saved!");
const handleSubmit = async () => {
  try {
    if (
      !selectedOption ||
      !challanNumber ||
      !quantity ||
      !kg ||
      !meter ||
      !roll
    ) {
      toast.error("Please fill in all fields.");
      return; 
    }
    const response = await axios.post(
      "http://localhost:4000/api/product/add",
      {
        selectedOption,
        challanNumber,
        quantity,
        kg,
        meter,
        roll,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response);
    notify();
    console.log("Data saved successfully:", response.data);


    setSelectedOption("");
    setChallanNumber("");
    setQuantity("");
    setKg("");
    setMeter("");
    setRoll("");
  } catch (error) {
    console.error("Error saving data:", error);
    toast.error("Error saving data. Please try again later.");
  }
};

  // const dataToShow = submittedData.filter(dataItem => dataItem.selectedOption !== selectedOption);


  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center text-gray-800 shadow-lg bg-yellow-400 rounded-md p-6  transition-transform duration-300 w-full">
          Account Stock In
        </h1>
        <div className="form-data-start w-full max-w-md mt-6">
          <div className="relative inline-block text-left w-full mb-4">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                onClick={toggleDropdown}
              >
                <span className="text-lg font-bold">Party Name</span>
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={() => setIsOpen(false)}
              >
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                  </Transition.Child>
                  <span className="inline-block h-screen align-middle">
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Select Party Name
                      </Dialog.Title>
                      <div className="mt-4">
                        <div className="relative">
                          <input
                            type="text"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        {options
                          .filter((option) =>
                            option
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                            >
                              {option}
                            </button>
                          ))}
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
          {/* Display selected option */}
          {selectedOption && (
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Selected Party Name: {selectedOption}
              </p>
            </div>
          )}
          {/* Input Fields */}
          <div className="mt-4">
            <label
              htmlFor="challanNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Challan Number
            </label>
            <input
              type="text"
              id="challanNumber"
              name="challanNumber"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Challan Number"
              value={challanNumber}
              onChange={(e) => setChallanNumber(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="kg"
              className="block text-sm font-medium text-gray-700"
            >
              Kg
            </label>
            <input
              type="text"
              id="kg"
              name="kg"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Kg"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="meter"
              className="block text-sm font-medium text-gray-700"
            >
              Meter
            </label>
            <input
              type="text"
              id="meter"
              name="meter"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Meter"
              value={meter}
              onChange={(e) => setMeter(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="roll"
              className="block text-sm font-medium text-gray-700"
            >
              Roll
            </label>
            <input
              type="text"
              id="roll"
              name="roll"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Submit
            </button>
          </div>
          {lotNumber && (
            <div className="mt-4">
              <p className="text-gray-700">Generated Lot Number: {lotNumber}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
