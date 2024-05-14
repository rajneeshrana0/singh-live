import React from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  

  return (
    <div className="h-full flex-col justify-between  bg-white hidden lg:flex ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
            <img
              alt="dashboard-icon"
              src={require("../assets/dashboard-icon.png")}
            />
            <span className="text-sm font-medium"> Dashboard </span>
          </Link>

          {/* <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/inventory-icon.png")}
                  />
                  <span className="text-sm font-medium"> Inventory </span>
                </div>
              </Link>
            </summary>
          </details>

          <Link
            to="/purchase-details"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/supplier-icon.png")}
            />
            <span className="text-sm font-medium"> Purchase Details</span>
          </Link>
          <Link
            to="/sales"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img alt="sale-icon" src={require("../assets/supplier-icon.png")} />
            <span className="text-sm font-medium"> Sales</span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/manage-store">
                <div className="flex items-center gap-2">
                  <img
                    alt="store-icon"
                    src={require("../assets/mgstore.jpeg")}
                  />
                  <span className="text-sm font-medium"> Manage Store </span>
                </div>
              </Link>
            </summary>
          </details> */}

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/account-stock-in">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/asi.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Account Stock IN{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/job-card">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/jbc.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Account Stock Table{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/grey-stock">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/gsi.jpeg")} />
                  <span className="text-sm font-medium"> Grey Stock IN </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/grey-table">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/gsi.jpeg")} />
                  <span className="text-sm font-medium"> Grey Table </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/heat-issue">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/hi.jpeg")} />
                  <span className="text-sm font-medium"> Heatset Issue </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/heat-issue-table">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/hi.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Heatset Issue Table{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/processing-issue">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/pi.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Processing Issue{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/processing-issue-table">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/pi.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Processing Issue Table{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/finish-issue">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/fi.jpeg")} />
                  <span className="text-sm font-medium"> Finish Issue </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/finish-issue-table">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/fi.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Finish Issue Table{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/dispatch-stock">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/dis.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Dispatch Stock Out{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/dispatch-data">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/aso.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Dispatch Stock Table{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/account-stock-out">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/aso.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Account Stock Out{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/stock-out-data">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/aso.jpeg")} />
                  <span className="text-sm font-medium">
                    {" "}
                    Account Stock Out Table{" "}
                  </span>
                </div>
              </Link>
            </summary>
          </details>

          {/* <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/testing-data">
                <div className="flex items-center gap-2">
                  <img alt="store-icon" src={require("../assets/aso.jpeg")} />
                  <span className="text-sm font-medium"> Test </span>
                </div>
              </Link>
            </summary>
          </details> */}
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <Link to="/profile-page">
          <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt="Profile"
              src={localStorageData.imageUrl}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  {localStorageData.firstName + " " + localStorageData.lastName}
                </strong>

                <span> {localStorageData.email} </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
