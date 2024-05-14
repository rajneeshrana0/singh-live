import React, { useState, useEffect } from "react";
import axios from "axios"; 

const ProfilePage = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    // Fetch user data from the API
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/login");
        setUser(response.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); 
  }, []); 

 
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 shadow-lg bg-yellow-400 rounded-md p-6 hover:scale-105 transition-transform duration-300 w-full">
        Profile Page
      </h1>

      <div className="mt-8 max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={user.firstName} 
               
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={user.email} 
              readOnly 
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={user.phoneNumber}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
