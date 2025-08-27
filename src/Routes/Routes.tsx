// @ts-nocheck
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Billing from "../Billing/Billing";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Registration";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../Protection/ProtectedRoute";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
   
        <Route path="/" element={<Billing />} />
      

      
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration/>} />
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute element={<AdminLayout />} />
          }
        />

        {/* </Route> */}
      </Routes>
    
    </BrowserRouter>
  );
};

export default routes;
