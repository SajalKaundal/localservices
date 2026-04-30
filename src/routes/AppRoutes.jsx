import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';

import LandingPage from '../pages/public/LandingPage';
import CategoriesPage from '../pages/public/CategoriesPage';
import ServiceListing from '../pages/public/ServiceListing';
import ProviderDetail from '../pages/public/ProviderDetail';
import ProvidersPage from '../pages/public/ProvidersPage';
import Auth from '../pages/public/Auth';

import DashboardLayout from '../layouts/DashboardLayout';
import ConsumerDashboard from '../pages/consumer/Dashboard';
import BookingFlow from '../pages/consumer/BookingFlow';
import MyBookings from '../pages/consumer/MyBookings';
import BookingDetails from '../pages/consumer/BookingDetails';
import Messaging from '../pages/consumer/Messaging';
import Payments from '../pages/consumer/Payments';
import ConsumerProfile from '../pages/consumer/Profile';

import ProviderDashboard from '../pages/provider/Dashboard';
import ProviderOnboarding from '../pages/provider/Onboarding';
import ManageServices from '../pages/provider/ManageServices';
import AddService from '../pages/provider/AddService';
import EditService from '../pages/provider/EditService';
import ProviderEarnings from '../pages/provider/Earnings';
import BookingRequests from '../pages/provider/BookingRequests';
import MyJobs from '../pages/provider/MyJobs';
import ProviderProfile from '../pages/provider/Profile';

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import ServiceManagement from '../pages/admin/ServiceManagement';
import BookingManagement from '../pages/admin/BookingManagement';
import PaymentsCommission from '../pages/admin/PaymentsCommission';
import ReviewModeration from '../pages/admin/ReviewModeration';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<CategoriesPage />} />
        <Route path="/services/:id" element={<ServiceListing />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/provider/:id" element={<ProviderDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/consumer/book" element={<BookingFlow />} />
      </Route>
      
      <Route element={<DashboardLayout />}>
        <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
        <Route path="/consumer/bookings" element={<MyBookings />} />
        <Route path="/consumer/bookings/:id" element={<BookingDetails />} />
        <Route path="/consumer/messages" element={<Messaging />} />
        <Route path="/consumer/payments" element={<Payments />} />
        <Route path="/consumer/profile" element={<ConsumerProfile />} />
        
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/onboarding" element={<ProviderOnboarding />} />
        <Route path="/provider/services" element={<ManageServices />} />
        <Route path="/provider/services/add" element={<AddService />} />
        <Route path="/provider/services/edit/:id" element={<EditService />} />
        <Route path="/provider/earnings" element={<ProviderEarnings />} />
        <Route path="/provider/requests" element={<BookingRequests />} />
        <Route path="/provider/jobs" element={<MyJobs />} />
        <Route path="/provider/profile" element={<ProviderProfile />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/services" element={<ServiceManagement />} />
        <Route path="/admin/bookings" element={<BookingManagement />} />
        <Route path="/admin/settings" element={<PaymentsCommission />} />
        <Route path="/admin/reviews" element={<ReviewModeration />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
