import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SideMenu() {
  const [userRole, setUserRole] = useState(null);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch user role after component mounts
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      // Fetch user role using stored JWT token
      const token = localStorage.getItem("token");
      const response = await axios.get("https://servers-beit.onrender.com/api/login", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserRole(response.data.check);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  // Define menu items based on user role
  const menuItems = {
    Account: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/home.png") },
      { to: "/account-stock-in", label: "Stock In", icon: require("../assets//stockIn.png") },
      { to: "/job-card", label: "Stock In Table", icon: require("../assets//stockInTable.png") },
      { to: "/account-stock-out", label: "Stock Out ", icon: require("../assets//stockOut.png") },
      { to: "/stock-out-data", label: "Stock Out Table", icon: require("../assets//stockOutta.png") },

    ],
    Dispatch: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/dispatch-stock", label: " Dispatch Stock In", icon: require("../assets//aso.jpeg") },
      { to: "/dispatch-data", label: " Dispatch Stock Table", icon: require("../assets//aso.jpeg") },

    ],
    Heat: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/heat-issue", label: "Heatset Issue", icon: require("../assets//aso.jpeg") },
      { to: "/heat-issue-table", label: "Heatset Issue Table", icon: require("../assets//aso.jpeg") },

    ],
    Process: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/processing-issue", label: " Processing Issue", icon: require("../assets//aso.jpeg") },
      { to: "/processing-issue-table", label: " Processing Issue Table Completed", icon: require("../assets//aso.jpeg") },
      { to: "/processing-issue-table-reject", label: " Processing Issue Table Reject", icon: require("../assets//aso.jpeg") },

    ],
    Finish: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/finish-issue", label: "Finish Issue", icon: require("../assets/aso.jpeg") },
      { to: "finish-issue-table", label: "Finish Issue Table", icon: require("../assets//aso.jpeg") },
      { to: "/finish-issue-table-reject", label: " Finish Issue Table Reject", icon: require("../assets//aso.jpeg") },

    ],
    Grey: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/grey-stock", label: "Grey Stock IN ", icon: require("../assets//aso.jpeg") },
      { to: "/grey-table", label: " Grey Table", icon: require("../assets//aso.jpeg") },
      { to: "/grey-table-reject", label: " Grey Table Reject", icon: require("../assets//aso.jpeg") },
    ],

    Admin: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/job-card", label: "Account Stock IN", icon: require("../assets//aso.jpeg") },
      { to: "/grey-table", label: "Grey Data", icon: require("../assets//aso.jpeg") },
      { to: "/heat-issue-table", label: "Heat Data", icon: require("../assets//aso.jpeg") },
      { to: "finish-issue-table", label: " Finish Data", icon: require("../assets//aso.jpeg") },
      { to: "/dispatch-data", label: "Dispatch Data ", icon: require("../assets//aso.jpeg") },
      { to: "/stock-out-data", label: "Account Stock Out Table", icon: require("../assets//aso.jpeg") },
      { to: "/add-user", label: "Add User", icon: require("../assets//aso.jpeg") },
      { to: "/add-party", label: "Add Party", icon: require("../assets//aso.jpeg") },
      { to: "/add-quality", label: "Add Quality", icon: require("../assets//aso.jpeg") },
      { to: "/greyreport", label: "Grey Report", icon: require("../assets//aso.jpeg") },
      { to: "/dispatchreport", label: "Dispatch Report", icon: require("../assets//aso.jpeg") },
      { to: "/partyreport", label: "Party Sum Report", icon: require("../assets//aso.jpeg") },
      { to: "/pendencyreport", label: "Pendency Report", icon: require("../assets//aso.jpeg") },
    ],

    // Define menu items for other roles as needed
  };

  // Handle case where userRole is not found in menuItems
  const userMenuItems = menuItems[userRole] || [];

  return (
    <div className="h-full w-[265px] flex-col justify-between bg-nav hidden lg:flex shadow-md shadow-gray-600 font-login">

      <div className="pt-4 ">
        <nav aria-label="Main Nav" className="flex flex-col space-y-1">
          {userMenuItems.map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.to}
              className="flex items-center gap-2 rounded-lg hover:bg-login hover:text-white px-3 py-2"
            >
              <img alt={menuItem.label} src={menuItem.icon}
                className="flex items-center gap-2 " />
              <span className="text-[16px] font-medium hover:bg-login hover:text-white font-login">{menuItem.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Profile section */}

      <div className=" fixed inset-x-0 bottom-0 w-[265px] h-[90px]">
        <Link to="/profile-page">
          <div className="flex items-center gap-2 bg-foooter_bg p-4 hover:bg-gray-50">
            <div className="font-semibold font-footer text-[14px]">
              <div className="">
                <p className="text-xs ">
                  <strong className="block ml-6 ">
                    {localStorageData.firstName + " " + localStorageData.lastName}
                  </strong>

                  <span className="text-footer_red ml-12">
                    View Profile
                  </span>
                </p>
              </div>
            </div>

            <img
              alt="Profile"
              // src={localStorageData.imageUrl}
              src={require("../assets/footer_img.png")}
              className="h-[48px] w-[48px] rounded-full object-cover"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
