import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Modal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/store/add",
        {
          ...values,
          selectedOption: data.selectedOption,
          challanNumber: data.challanNumber,
          quantity: data.quantity,
          lotNumber: data.lotNumber,
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
        <div className="flex flex-col justify-between p-5 w-1/2 bg-indigo-600 rounded-l-lg">
          <div className="p-6 border-b border-gray-300">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              Dispatch Out Stock
            </h3>
            <div className="mt-6 bg-gray-200 rounded-lg p-6">
              <div className="text-gray-700 font-semibold mb-4">
                <span className="text-gray-900 mr-2">Selected Option:</span>
                <span className="text-indigo-600">{data.selectedOption}</span>
              </div>
              <div className="text-gray-700 font-semibold mb-4">
                <span className="text-gray-900 mr-2">Challan Number:</span>
                <span className="text-indigo-600">{data.challanNumber}</span>
              </div>
              <div className="text-gray-700 font-semibold">
                <span className="text-gray-900 mr-2">Quantity:</span>
                <span className="text-indigo-600">{data.quantity}</span>
              </div>
              <div className="text-gray-700 font-semibold">
                <span className="text-gray-900 mr-2">Lot Number:</span>
                <span className="text-indigo-600">{data.lotNumber}</span>
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
          initialValues={{ kg: "", meter: "", roll: "", karigar: ''}}
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
            if (!values.karigar) {
              errors.karigar = "Required";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          <Form className="p-6 flex-auto">
            <div className="mb-4">
              <label
                htmlFor="karigar"
                className="block text-sm font-medium text-gray-700"
              >
                karigar:
              </label>
              <Field
                type="text"
                id="karigar"
                name="karigar"
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter karigar"
              />
              <ErrorMessage
                name="karigar"
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
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
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
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
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
                className="border border-gray-300 rounded-md p-2 mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter roll"
              />
              <ErrorMessage
                name="roll"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
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
