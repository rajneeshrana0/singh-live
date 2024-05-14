import React from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./dashboard/Dashboard";


import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import NoPageFound from "./pages/NoPageFound";

import AuthContext from "./AuthContext";
import ProtectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";

import AccountStockIn from "./account-in/AccountStockIn";
import JobCardIssue from "./account-in/JobCardIssue";

import AccountStockOut from "./account-out/AccountStockOut";
import AccountStockOutTable from "./account-out/AccountStockOutTable";

import GreyStockIn from "./grey-stock/GreyStockIn";
import GreyTable from "./grey-stock/GreyTable"

import HeatIssue from "./pages/HeatIssue";
import HeatIssueTable from './pages/HeatIssueTable'
import ProcessingIssue from "./pages/ProcessingIssue";
import ProcessingIssueTable from "./pages/ProcessingTable";
import FinishIssue from "./pages/FinishIssue";
import FinishIssueTable from "./pages/FinishIssueTable";


import DispatchStockIn from "./dispatch/DispatchStockIn";
import DispatchStockTable from "./dispatch/DispatchStockTable";       

import ProfilePage from "./pages/ProfilePage";
import Test from "./pages/Test";

const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));
  // console.log("USER: ",user)

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
      // console.log("inside effect", myLoginUser)
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            {/* <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase-details" element={<PurchaseDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} /> */}
            <Route path="account-stock-in" element={<AccountStockIn />} />
            <Route path="job-card" element={<JobCardIssue />} />
            <Route path="grey-stock" element={<GreyStockIn />} />
            <Route path="grey-table" element={<GreyTable />} />
            <Route path="heat-issue" element={<HeatIssue />} />
            <Route path="heat-issue-table" element={<HeatIssueTable />} />
            <Route path="processing-issue" element={<ProcessingIssue />} />
            <Route
              path="processing-issue-table"
              element={<ProcessingIssueTable />}
            />
            <Route path="finish-issue" element={<FinishIssue />} />
            <Route path="finish-issue-table" element={<FinishIssueTable />} />
            <Route path="dispatch-stock" element={<DispatchStockIn />} />
            <Route path="account-stock-out" element={<AccountStockOut />} />
            <Route path="profile-page" element={<ProfilePage />} />
            <Route path="dispatch-data" element={<DispatchStockTable />} />
            <Route path="stock-out-data" element={<AccountStockOutTable />} />
            <Route path="testing-data" element={<Test />} />
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
