import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const check = ['Account', 'Grey', 'Heat', 'Process', 'Finish', 'Dispatch']; // Defining roles array

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    check: check[0], // Setting default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://servers-beit.onrender.com/api/register', formData);
      toast.success(`User registered successfully  role: ${formData.check}`); // Accessing check instead of role
      console.log('User registered successfully:', response.data);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto mt-8 p-6 bg-nav rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 font-login font-semibold">ADD USER</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-6 border-2 rounded-lg h-[140px] overflow-hidden shadow-md shadow-darkgray ">
            <label htmlFor="firstName" className="ml-4 mt-2 block text-gray-700">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-[300px] ml-4 border rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-darkgray focus:border-darkgray placeholder:font-login "
              placeholder="Your Answer" />
            <div className="bg-darkgray h-4 w-full mt-2"></div>
          </div>

          <div className="mb-4 mt-6 border-2 rounded-lg h-[140px] overflow-hidden shadow-md shadow-darkgray ">
            <label htmlFor="lastName" className="block ml-4 mt-2 text-gray-700">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-[300px] ml-4 border rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-darkgray focus:border-darkgray placeholder:font-login"
              placeholder="Your Answer" />
            <div className="bg-darkgray h-4 w-full mt-2"></div>
          </div>

          <div className="mb-4 mt-6 border-2 rounded-lg h-[140px] overflow-hidden shadow-md shadow-darkgray ">
            <label htmlFor="email" className="block ml-4 mt-2 text-gray-700">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-[300px] ml-4 border rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-darkgray focus:border-darkgray placeholder:font-login"
              placeholder="Your Answer" />
            <div className="bg-darkgray h-4 w-full mt-2"></div>
          </div>

          <div className="mb-4 mt-6 border-2 rounded-lg h-[140px] overflow-hidden shadow-md shadow-darkgray ">
            <label htmlFor="password" className="block ml-4 mt-2 text-gray-700">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-[300px] ml-4 border rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-darkgray focus:border-darkgray placeholder:font-login"
              placeholder="Your Answer" />
            <div className="bg-darkgray h-4 w-full mt-2"></div>
          </div>

          <div className="mb-4 mt-6 border-2 rounded-lg h-[140px] overflow-hidden shadow-md shadow-darkgray ">
            <label htmlFor="phoneNumber" className="block ml-4 mt-2 text-gray-700">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-[300px] ml-4 border rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-darkgray focus:border-darkgray placeholder:font-login"
              placeholder="Your Answer" />
            <div className="bg-darkgray h-4 w-full mt-2"></div>
          </div>

          <div className="mb-4 mt-6 border-2 rounded-lg h-[140px] overflow-hidden shadow-md shadow-darkgray ">
            <label htmlFor="check" className="block ml-4 mt-2 text-gray-700">Role:</label>
            <select id="check" name="check" value={formData.check} onChange={handleChange} className="w-[300px] ml-4 border rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-darkgray focus:border-darkgray placeholder:font-login">
              {check.map((role, index) => ( // Mapping over check instead of roles
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
            <div className="bg-darkgray h-4 w-full mt-2"></div>
          </div>

          <button type="submit" className="mt-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-darkgray rounded-md hover:bg-white hover:text-darkgray outline">Register</button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
