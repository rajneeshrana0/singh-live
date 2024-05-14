import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modal({ isOpen, onClose, data }) {
  const [qualities, setQualities] = useState([]);
  const [selectedQualities, setSelectedQualities] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(""); // State for selected quantity

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://servers-beit.onrender.com/api/qualities")
      .then((response) => {
        setQualities(response.data);
        setSelectedQuantity(data.quantity); // Set the initial selected quantity
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setSelectedQuantity]); // Update when data.quantity changes

  const handleSelect = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the selected quality to the array
      setSelectedQualities((prevState) => [...prevState, value]);
    } else {
      // Remove the deselected quality from the array
      setSelectedQualities((prevState) =>
        prevState.filter((item) => item !== value)
      );
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://servers-beit.onrender.com/api/purchase/add",
        {
          ...values,
          selectedOption: data.selectedOption,
          challanNumber: data.challanNumber,
          quantity: selectedQuantity, // Use selected quantity
        },
        {
          withCredentials: true,
        }
      );
      console.log("Form data submitted:", response.data);
      toast.success("Grey successfully added");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error adding Grey");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none bg-gray-800 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl mx-auto flex">
        <div className="flex flex-col justify-between p-5 w-1/2 bg-darkgray rounded-l-lg">
          <div className="p-6 border-b border-gray-300">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              Grey Stock
            </h3>
            <div className="mt-6 bg-gray-200 rounded-lg p-6">
              <div className="text-gray-700 font-semibold mb-4">
                <span className="text-nav mr-2">Selected Option:</span>
                <span className="text-white">{data.selectedOption}</span>
              </div>
              <div className="text-gray-700 font-semibold mb-4">
                <span className="text-nav mr-2">Challan Number:</span>
                <span className="text-white">{data.challanNumber}</span>
              </div>

              <div className="text-gray-700 font-semibold">
                <span className="text-nav mr-2">Quality:</span>
                <span className="text-nav">{selectedQuantity}</span>
              </div>
            </div>
          </div>

          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Formik
          initialValues={{ kg: "", meter: "", roll: "", processTypes: [] }}
          validate={(values) => {
            const errors = {};
            if (!values.kg) {
              errors.kg = "Required";
            }
            if (!values.meter) {
              errors.meter = "Required";
            }
            if (!values.roll) {
              errors.roll = "Required";
            }
            if (values.processTypes.length === 0) {
              errors.processTypes = "Required";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="p-6 flex-auto">
            <div className="mb-4">
              <label
                htmlFor="shade"
                className="block text-sm font-medium text-gray-700"
              >
                Shade:
              </label>
              <Field
                type="text"
                id="shade"
                name="shade"
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-darkgray focus:border-darkgray"
                placeholder="Enter Shade"
              />
              <ErrorMessage
                name="shade"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="kg"
                className="block text-sm font-medium text-gray-700"
              >
                kg:
              </label>
              <Field
                type="text"
                id="kg"
                name="kg"
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-darkgray focus:border-darkgray"
                placeholder="Enter kg"
              />
              <ErrorMessage
                name="kg"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="meter"
                className="block text-sm font-medium text-gray-700"
              >
                Meter:
              </label>
              <Field
                type="text"
                id="meter"
                name="meter"
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-darkgray focus:border-darkgray"
                placeholder="Enter meter"
              />
              <ErrorMessage
                name="meter"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="roll"
                className="block text-sm font-medium text-gray-700"
              >
                Roll:
              </label>
              <Field
                type="text"
                id="roll"
                name="roll"
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-darkgray focus:border-darkgray"
                placeholder="Enter roll"
              />
              <ErrorMessage
                name="roll"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Select Quality:
              </label>

              <Field
                as="select"
                id="quantity"
                name="quantity"
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-darkgray focus:border-darkgray"
                value={selectedQuantity} // Bind selected quantity
                onChange={(e) => setSelectedQuantity(e.target.value)}
              >
                <option value="">Select Quality</option> {/* Default empty option */}
                {data.quantity && data.quantity.map((quantityValue, index) => (
                  <option key={index} value={quantityValue}>
                    {quantityValue}
                  </option>
                ))}
              </Field>
            </div>

            <div className="mb-4">
              <label
                htmlFor="processTypes"
                className="block text-sm font-medium text-gray-700"
              >
                Select Process Types:
              </label>
              <div className="mt-1 flex">
                <label className="inline-flex items-center mr-4">
                  <Field
                    type="radio"
                    name="processTypes"
                    value="half"
                    className="form-radio h-4 w-4 text-darkgray focus:ring-darkgray "
                  />
                  <span className="ml-2 text-gray-700">Half Process</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <Field
                    type="radio"
                    name="processTypes"
                    value="full"
                    className="form-radio h-4 w-4 text-darkgray focus:ring-darkgray"
                  />
                  <span className="ml-2 text-gray-700">Full Process</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="processTypes"
                    value="finish"
                    className="form-radio h-4 w-4 text-darkgray focus:ring-darkgray"
                  />
                  <span className="ml-2 text-gray-700">Finish</span>
                </label>
              </div>

              <ErrorMessage
                name="processTypes"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Modal;
