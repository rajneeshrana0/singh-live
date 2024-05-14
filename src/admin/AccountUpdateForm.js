import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("accessToken");

const Preview = ({
  selectedParty,
  selectedQualities,
  challanNumber,
  kg,
  meter,
  roll,
}) => {
  return (
    <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
      <div className="mt-4 ml-4 h-24 font-login text-2xl font-semibold">
        Preview
      </div>
      <div className="bg-darkgray h-4 w-full overflow-hidden"></div>

      <div className="ml-4 mt-4">
        <p className="text-gray-700 mb-2">Party Name: {selectedParty}</p>
        <p className="text-gray-700 mb-2">
          Qualities: {selectedQualities.join(", ")}
        </p>
        <p className="text-gray-700 mb-2">Challan Number: {challanNumber}</p>
        <p className="text-gray-700 mb-2">KG: {kg}</p>
        <p className="text-gray-700 mb-2">Meter: {meter}</p>
        <p className="text-gray-700 mb-2">Roll: {roll}</p>
      </div>
    </div>
  );
};

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [selectedQualities, setSelectedQualities] = useState([]);
  const [challanNumber, setChallanNumber] = useState("");
  const [kg, setKg] = useState("");
  const [meter, setMeter] = useState("");
  const [roll, setRoll] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [partyOptions, setPartyOptions] = useState([]);
  const [qualityOptions, setQualityOptions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get("https://servers-beit.onrender.com/api/parties");
        setPartyOptions(response.data.map((party) => party.name));
      } catch (error) {
        console.error("Error fetching party data:", error);
        toast.error("Error fetching party data. Please try again later.");
      }
    };

    const fetchQualityOptions = async () => {
      try {
        const response = await axios.get("https://servers-beit.onrender.com/api/qualities");
        setQualityOptions(response.data.map((quality) => quality.name));
      } catch (error) {
        console.error("Error fetching quality data:", error);
        toast.error("Error fetching quality data. Please try again later.");
      }
    };

    fetchParties();
    fetchQualityOptions();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePartyOptionClick = (option) => {
    setSelectedParty(option);
  };

  const handleQualityOptionClick = (option) => {
    const index = selectedQualities.indexOf(option);
    if (index === -1) {
      setSelectedQualities([...selectedQualities, option]);
    } else {
      const newSelectedQualities = [...selectedQualities];
      newSelectedQualities.splice(index, 1);
      setSelectedQualities(newSelectedQualities);
    }
  };

  const notify = () => toast("Data Saved!");

  const handleSubmit = async () => {
    try {
      if (
        !selectedParty ||
        selectedQualities.length === 0 ||
        !challanNumber ||
        !kg ||
        !meter ||
        !roll
      ) {
        toast.error("Please fill in all fields.");
        return;
      }
      const response = await axios.post(
        "https://servers-beit.onrender.com/api/product/add",
        {
          selectedOption: selectedParty, // Change selectedParty to selectedOption
          quantity: selectedQualities, // Add quantities field with selectedQualities array
          challanNumber,
          kg,
          meter,
          roll,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notify();
      setSelectedParty("");
      setSelectedQualities([]);
      setChallanNumber("");
      setKg("");
      setMeter("");
      setRoll("");
      setLotNumber(response.data.lotNumber); // Assuming the response contains lotNumber
    } catch (error) {
      console.error("Error saving data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      toast.error("Error saving data. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center">
        <div className="form-data-start w-full max-w-md mt-6">
          <div className="border-login border-[1px] rounded-xl overflow-hidden">
            <div className="mt-4 ml-4 h-24 font-login text-2xl font-semibold">
              Account Stock IN
            </div>
            <div className="bg-darkgray h-4 w-full overflow-hidden"></div>
          </div>

          {/* Quality card */}
          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="ml-4 mt-4 font-login">
              Quality <span className="text-red-600">*</span>{" "}
            </div>
            <div className="relative mt-4 ml-4 mb-4">
              <div className="inline-block relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="block w-[300px] bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline"
                >
                  Select Qualities
                  <svg
                    className="absolute inset-y-0 right-0 w-4 h-4 mt-3 mr-4 pointer-events-none fill-current text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute w-[300px] mt-2 bg-white border border-gray-300 shadow-lg rounded">
                    <div className="p-2">
                      {qualityOptions.map((quality, index) => (
                        <label
                          key={index}
                          className="inline-flex items-center mt-1"
                        >
                          <input
                            type="checkbox"
                            value={quality}
                            checked={selectedQualities.includes(quality)}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (e.target.checked) {
                                setSelectedQualities((prevSelected) => [
                                  ...prevSelected,
                                  value,
                                ]);
                              } else {
                                setSelectedQualities((prevSelected) =>
                                  prevSelected.filter((item) => item !== value)
                                );
                              }
                            }}
                            className="mr-2"
                          />
                          {quality}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Display selected qualities */}
            {selectedQualities.length > 0 && (
              <div className="mt-4 ml-4">
                <p className="text-gray-700 mb-2 font-login">
                  Selected Quality:
                </p>
                <ul className="flex flex-wrap">
                  {selectedQualities.map((quality, index) => (
                    <li
                      key={index}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      {quality}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="bg-darkgray h-4 w-full "></div>
          </div>

          {/* Party Dropdown */}
          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="relative mt-4">
              <div className="ml-4 font-login">
                Party Name <span className="text-red-600">*</span>{" "}
              </div>
              <select
                className="block appearance-none w-[300px] bg-white border mt-4 ml-4 mb-4 border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                value={selectedParty}
                onChange={(e) => setSelectedParty(e.target.value)}
              >
                <option value="">Select Party</option>
                {partyOptions.map((party, index) => (
                  <option key={index} value={party}>
                    {party}
                  </option>
                ))}
              </select>
            </div>
            {/* Display selected party */}
            {selectedParty && (
              <div className="mt-2">
                <p className="text-gray-700 ml-4 mb-4 font-login">
                  Selected Party: {selectedParty}
                </p>
              </div>
            )}
            <div className="bg-darkgray h-4 w-full "></div>
          </div>

          {/* Input Fields */}
          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="roll"
                className="block text-lg font-login ml-4 text-gray-700"
              >
                Enter Challan Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="challanNumber"
                name="challanNumber"
                className="mt-4 mb-4 ml-4 block w-[300px] border-gray-300 rounded-xs shadow-sm  placeholder:font-login text-[24px] sm:text-sm shadow-black focus:ring-darkgray focus:border-darkgray"
                placeholder="Your answer"
                value={challanNumber}
                onChange={(e) => setChallanNumber(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full "></div>
            </div>
          </div>

          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="kg"
                className="block text-lg font-login ml-4 text-gray-700"
              >
                KG <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="kg"
                name="kg"
                className="mt-4 mb-4 ml-4 block w-[300px] border-gray-300 rounded-xs shadow-sm  placeholder:font-login text-[24px] sm:text-sm shadow-black focus:ring-darkgray focus:border-darkgray"
                placeholder="Your answer"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full "></div>
            </div>
          </div>

          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="meter"
                className="block text-lg font-login ml-4 text-gray-700"
              >
                Meter <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="meter"
                name="meter"
                className="mt-4 mb-4 ml-4 block w-[300px] border-gray-300 rounded-xs shadow-sm  placeholder:font-login text-[24px] sm:text-sm shadow-black focus:ring-darkgray focus:border-darkgray"
                placeholder="Your answer"
                value={meter}
                onChange={(e) => setMeter(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full "></div>
            </div>
          </div>

          <div className="border-login border-[1px] rounded-xl overflow-hidden mt-8">
            <div className="mt-4">
              <label
                htmlFor="roll"
                className="block text-lg font-login ml-4 text-gray-700"
              >
                Roll <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="roll"
                name="roll"
                className="mt-4 mb-4 ml-4 block w-[300px] border-gray-300 rounded-xs shadow-sm  placeholder:font-login text-[24px] sm:text-sm shadow-black focus:ring-darkgray focus:border-darkgray"
                placeholder="Your answer"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
              <div className="bg-darkgray h-4 w-full "></div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>
          {lotNumber && (
            <div className="mt-4">
              <p className="text-gray-700">Generated Lot Number: {lotNumber}</p>
            </div>
          )}
          {showPreview && (
            <Preview
              selectedParty={selectedParty}
              selectedQualities={selectedQualities}
              challanNumber={challanNumber}
              kg={kg}
              meter={meter}
              roll={roll}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
