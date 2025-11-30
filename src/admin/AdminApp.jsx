import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";

import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Complaints from "./pages/Complaints";

import AddStaff from "./pages/c-xyz/addstaff";
import EditStaff from "./pages/c-xyz/editstaff";
import AddPayment from "./pages/c-xyz/addpayment";
import StaffUtilities from "./pages/StaffUtilities";

import Signup from "./pages/auth/signup";
import Login from "./pages/auth/loginpage";

import TenantDetails from "./pages/c-xyz/tenantdetail";
import EditTenant from "./pages/c-xyz/Editingtenant";
import NotPaidTenants from "./pages/c-xyz/notpaidtenant";

import AddRoomForm from "./pages/c-xyz/addroom";
import ShowRooms from "./pages/c-xyz/showallroom";
import { AddHotelRoom } from "./pages/c-xyz/hotelroom";
import EditRoomForm from "./pages/c-xyz/editpage";

export default function AdminApp() {
  return (
    <Routes>
      {/* ADMIN DASHBOARD WRAPPED ROUTES */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="properties" replace />} />

        <Route path="properties" element={<Properties />} />
        <Route path="addroom" element={<AddRoomForm />} />
        <Route path="add-payment" element={<AddPayment />} />
        <Route path="edit-room/:id" element={<EditRoomForm />} />
        <Route path="all-notpaid-tenant" element={<NotPaidTenants />} />
        <Route path="edit/:id" element={<EditStaff />} />
        <Route path="tenaantdetail/:id" element={<TenantDetails />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="edittenant/:id" element={<EditTenant />} />
        <Route path="payments" element={<Payments />} />
        <Route path="addstaff" element={<AddStaff />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="staff" element={<StaffUtilities />} />
        <Route path="showrooms" element={<ShowRooms />} />
        <Route path="addhotelroom" element={<AddHotelRoom />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="properties" replace />} />
      </Route>

      {/* ADMIN AUTH ROUTES */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}
