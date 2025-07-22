import { Routes, Route } from 'react-router-dom';
import React from "react";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./Componets/AdminDashboard";
import AdminProtectWrapper from "./Componets/ProtectionWrapper/AdminProtectWrapper";
import AdminProfile from "./Componets/AdminProfile";
import AdminUserList from "./Componets/AdminUserList";
import UserSignup from "./Componets/User/UserSignup";
import { UserDashboard } from "./Componets/User/UserDashboard";
import UserProtection from "./Componets/User/ProtectionWrapper/UserProtection";
import UserLogin from "./Componets/User/UserLogin";
import UserProfile from "./Componets/User/UserProfile";
import OrganizerLogin from "./Componets/Organizer/OrganizerLogin";
import OrganizerSignup from "./Componets/Organizer/OrganizerSignup";
import OrganizerDashboard from "./Componets/Organizer/OrganizerDashboard";
import OrganizerProtectWrapper from "./Componets/ProtectionWrapper/OrganizerProtectWrapper";
import BasicDetails from "./Componets/Organizer/CreateEvent/BasicDetails";
import BannerUpload from "./Componets/Organizer/CreateEvent/BannerUpload";
import Ticketing from "./Componets/Organizer/CreateEvent/Ticketing";
import Review from "./Componets/Organizer/CreateEvent/Review";
import EventSteps from './Componets/Organizer/CreateEvent/EventSteps';
import EventDetails from './Componets/Organizer/EventDetails';
import UserEventDetails from './Componets/User/EventDetails';
import ExploreEvents from './Componets/User/ExploreEvents';

function App() {
  return (
    <Routes>
      {/* Root Route - User Login */}
      <Route path="/" element={<UserLogin />} />
      <Route path="/user/login" element={<UserLogin />} />

      {/* User Routes */}
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/user/dashboard" element={<UserProtection><UserDashboard /></UserProtection>} />
      <Route path="/user/profile" element={<UserProtection><UserProfile /></UserProtection>} />
      <Route path="/events" element={<ExploreEvents />} />
      <Route path="/events/:eventId" element={<UserEventDetails />} />

      {/* Organizer Routes */}
      <Route path="/organizer/login" element={<OrganizerLogin />} />
      <Route path="/organizer/signup" element={<OrganizerSignup />} />
      <Route path="/organizer/dashboard" element={<OrganizerProtectWrapper><OrganizerDashboard /></OrganizerProtectWrapper>} />
      <Route path="/organizer/create-event" element={<OrganizerProtectWrapper><BasicDetails /></OrganizerProtectWrapper>} />
      <Route path="/organizer/create-event/edit/:eventId" element={<OrganizerProtectWrapper><EventSteps /></OrganizerProtectWrapper>} />
      <Route path="/organizer/events/:eventId" element={<OrganizerProtectWrapper><EventDetails /></OrganizerProtectWrapper>} />
      <Route
        path="/organizer/create-event/banner/:eventId"
        element={
          <OrganizerProtectWrapper>
            <BannerUpload />
          </OrganizerProtectWrapper>
        }
      />
      <Route
        path="/organizer/create-event/ticketing/:eventId"
        element={
          <OrganizerProtectWrapper>
            <Ticketing />
          </OrganizerProtectWrapper>
        }
      />
      <Route
        path="/organizer/create-event/review/:eventId"
        element={
          <OrganizerProtectWrapper>
            <Review />
          </OrganizerProtectWrapper>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminProtectWrapper><AdminDashboard /></AdminProtectWrapper>} />
      <Route path="/admin/users" element={<AdminProtectWrapper><AdminUserList /></AdminProtectWrapper>} />
      <Route path="/admin/profile" element={<AdminProtectWrapper><AdminProfile /></AdminProtectWrapper>} />

      {/* Catch all - Redirect to User Login */}
      <Route path="*" element={<UserLogin />} />
    </Routes>
  );
}

export default App;
