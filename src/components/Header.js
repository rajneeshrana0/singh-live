import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Dashboard", href: "/dashboard-account", current: true },
  { name: "Stock IN", href: "/account-stock-in", current: false },
  { name: "Stock IN Table", href: "/job-card", current: false },
  { name: "Stock Out", href: "/account-stock-out", current: false },
  { name: "Stock Out Table", href: "/stock-out-data", current: false },
];

const userNavigation = [{ name: "Sign out", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  
  const authContext = useContext(AuthContext);
  const [userName, setUserName] = useState(''); //  For displaying user name 
  const [profilePicUrl, setProfilePicUrl] = useState(''); // For displaying profile

  const localStorageData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('user'));
    console.log('localStorageData:', localStorageData); // Debugging log

    if (localStorageData && localStorageData.firstName && localStorageData.lastName) {
      const fullName = `${localStorageData.firstName} ${localStorageData.lastName}`;
      setUserName(fullName);

      const initials = `${localStorageData.firstName[0]}${localStorageData.lastName[0]}`;
      const profileUrl = generateProfilePicUrl(initials);
      console.log('Profile Picture URL:', profileUrl); // Debugging log
      setProfilePicUrl(profileUrl);
    } else {
      console.warn('No user name found in localStorage'); // Debugging log
    }
  }, []);

  const generateProfilePicUrl = (initials) => {
    // AvatarAPI URL
    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  };
  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        toast("Logout Successful!", { autoClose: 2000 });
        setTimeout(() => {
          localStorage.removeItem("user");
          authContext.signout();
        }, 2000);
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-nav p-3  shadow-gray-600">
          {({ open }) => (
            <>
              <div className="ml-[10px]">
                <div className=" flex items-center justify-between ">
                  <Link to="/dashboard-account">
                    <div className="flex gap-2">
                      <img
                        className="h-[41px] w-[40px]"
                        src={require("../assets/Slogo2.png")}
                        alt="Inventory Management System"
                      />
                      <p className="items-center mt-2 font-login font-semibold">SINGHANIA FINISHERS</p>

                    </div>
                  </Link>

                  <div className="flex items-center">
                    {/* need to add link into it */}
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-8 md:ml-6">
                      <button
                        type="button"
                        className=" bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>

                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <div className=" flex gap-[24px] items-center justify-center">
                              <img
                                className="h-[24px] w-[24px]"
                                src={require("../assets/searchicon.png")}
                                alt="Inventory Management System"
                              />
                              <img
                                className="h-[24px] w-[24px]"
                                src={require("../assets/commentIcon.png")}
                                alt="Inventory Management System"
                              />
                              <img
                                className="h-[24px] w-[24px]"
                                src={require("../assets/notificationIcon.png")}
                                alt="Inventory Management System"
                              />
                              <div>
                                <p className="font-semibold font-footer text-[14px]">{userName}</p>
                                <p className="font-medium font-footer text-[12px] text-footer_red" >Log Out</p>
                              </div>

                              <img
                                className="h-[48px] w-[48px] rounded-full"
                                src={profilePicUrl}
                                alt="profile"
                              />
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <button
                                    onClick={handleSignOut}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    <span>{item.name}</span>
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-darkgray focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Link to={item.href} key={item.name}>
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-darkgray mt-2 w-[300px] hover:bg-gray hover:text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:bg-gray hover:text-white mt-2 w-[300px]",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    {/* <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={localStorageData.imageUrl}
                        alt="profile"
                      />
                      
                    </div> */}
                    <Link
                      to={"/profile-page"}>
                      <div>
                        <div className="text-base font-medium leading-none text-black">
                          {localStorageData.firstName} {localStorageData.lastName}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {localStorageData.email}
                        </div>
                      </div>
                    </Link>

                    <button
                      type="button"
                      className="ml-auto flex-shrink-0  bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    ></button>
                  </div>
                  <div className="mt-3 space-y-1 px-2 cursor-pointer">
                    {userNavigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={handleSignOut}
                        className="block  px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:bg-gray hover:text-white rounded-lg"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
