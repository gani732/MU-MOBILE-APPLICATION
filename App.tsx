import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Create a client
const queryClient = new QueryClient();

// Common Pages
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import RoleSelection from "./components/RoleSelection";
import NotFound from "./pages/NotFound";
import RouteGuard from "./components/RouteGuard";

// Student Pages
import StudentHome from "./pages/student/StudentHome";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import StudentSchedule from "./pages/student/StudentSchedule";
import Subjects from "./pages/student/Subjects";
import TaskUpload from "./pages/TaskUpload";
import Profile from "./pages/Profile";
import Account from "./pages/student/Account";
import Settings from "./pages/student/Settings";
import Notifications from "./pages/student/Notifications";
import StudentAnnouncements from "./pages/student/StudentAnnouncements";

// Parent Pages
import ParentHome from "./pages/parent/ParentHome";
import FeePayment from "./pages/parent/FeePayment";
import StudentLocation from "./pages/parent/StudentLocation";
import MarksOverview from "./pages/parent/MarksOverview";
import FacultyContacts from "./pages/parent/FacultyContacts";
import ParentAnnouncements from "./pages/parent/ParentAnnouncements";
import ParentProfile from "./pages/parent/ParentProfile";

// Faculty Pages
import FacultyHome from "./pages/faculty/FacultyHome";
import FacultySubmissions from "./pages/faculty/FacultySubmissions";
import ClassAverage from "./pages/faculty/ClassAverage";
import FacultyAnnouncements from "./pages/faculty/FacultyAnnouncements";
import FacultyProfile from "./pages/faculty/FacultyProfile";
import FacultyStudents from "./pages/faculty/FacultyStudents";

// Admin Pages
import AdminHome from "./pages/admin/AdminHome";
import AdminFacultyList from "./pages/admin/AdminFacultyList";
import AdminParentsList from "./pages/admin/AdminParentsList";
import AdminStudentsList from "./pages/admin/AdminStudentsList";
import AdminTimetable from "./pages/admin/AdminTimetable";
import PostAnnouncement from "./pages/admin/PostAnnouncement";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminUsers from "./pages/admin/AdminUsers";
import ManageStudentParent from './pages/admin/ManageStudentParent';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate replace to="/admin/home" />} />
          <Route path="/admin/home" element={
            <RouteGuard requiredRole="admin">
              <AdminHome />
            </RouteGuard>
          } />
          <Route path="/admin/students" element={
            <RouteGuard requiredRole="admin">
              <AdminStudentsList />
            </RouteGuard>
          } />
          <Route path="/admin/faculty" element={
            <RouteGuard requiredRole="admin">
              <AdminFacultyList />
            </RouteGuard>
          } />
          <Route path="/admin/parents" element={
            <RouteGuard requiredRole="admin">
              <AdminParentsList />
            </RouteGuard>
          } />
          <Route path="/admin/users" element={
            <RouteGuard requiredRole="admin">
              <AdminUsers />
            </RouteGuard>
          } />
          <Route path="/admin/timetable" element={
            <RouteGuard requiredRole="admin">
              <AdminTimetable />
            </RouteGuard>
          } />
          <Route path="/admin/announcements" element={
            <RouteGuard requiredRole="admin">
              <AdminAnnouncements />
            </RouteGuard>
          } />
          <Route path="/admin/profile" element={
            <RouteGuard requiredRole="admin">
              <AdminProfile />
            </RouteGuard>
          } />
          <Route path="/admin/manage-student-parent" element={
            <RouteGuard requiredRole="admin">
              <ManageStudentParent />
            </RouteGuard>
          } />

          {/* Student Routes */}
          <Route path="/student" element={<Navigate replace to="/student/home" />} />
          <Route path="/student/home" element={
            <RouteGuard requiredRole="student">
              <StudentHome />
            </RouteGuard>
          } />
          <Route path="/student/announcements" element={
            <RouteGuard requiredRole="student">
              <StudentAnnouncements />
            </RouteGuard>
          } />
          <Route path="/student/attendance" element={
            <RouteGuard requiredRole="student">
              <Attendance />
            </RouteGuard>
          } />
          <Route path="/student/assignments" element={
            <RouteGuard requiredRole="student">
              <Assignments />
            </RouteGuard>
          } />
          <Route path="/student/schedule" element={
            <RouteGuard requiredRole="student">
              <StudentSchedule />
            </RouteGuard>
          } />
          <Route path="/student/subjects" element={
            <RouteGuard requiredRole="student">
              <Subjects />
            </RouteGuard>
          } />
          <Route path="/student/faculty-notes" element={
            <RouteGuard requiredRole="student">
              <TaskUpload />
            </RouteGuard>
          } />
          <Route path="/student/profile" element={
            <RouteGuard requiredRole="student">
              <Profile />
            </RouteGuard>
          } />
          <Route path="/student/account" element={
            <RouteGuard requiredRole="student">
              <Account />
            </RouteGuard>
          } />
          <Route path="/student/settings" element={
            <RouteGuard requiredRole="student">
              <Settings />
            </RouteGuard>
          } />
          <Route path="/student/notifications" element={
            <RouteGuard requiredRole="student">
              <Notifications />
            </RouteGuard>
          } />

          {/* Parent Routes */}
          <Route path="/parent" element={<Navigate replace to="/parent/home" />} />
          <Route path="/parent/home" element={
            <RouteGuard requiredRole="parent">
              <ParentHome />
            </RouteGuard>
          } />
          <Route path="/parent/fee-payment" element={
            <RouteGuard requiredRole="parent">
              <FeePayment />
            </RouteGuard>
          } />
          <Route path="/parent/location" element={
            <RouteGuard requiredRole="parent">
              <StudentLocation />
            </RouteGuard>
          } />
          <Route path="/parent/marks" element={
            <RouteGuard requiredRole="parent">
              <MarksOverview />
            </RouteGuard>
          } />
          <Route path="/parent/faculty" element={
            <RouteGuard requiredRole="parent">
              <FacultyContacts />
            </RouteGuard>
          } />
          <Route path="/parent/announcements" element={
            <RouteGuard requiredRole="parent">
              <ParentAnnouncements />
            </RouteGuard>
          } />
          <Route path="/parent/profile" element={
            <RouteGuard requiredRole="parent">
              <ParentProfile />
            </RouteGuard>
          } />

          {/* Faculty Routes */}
          <Route path="/faculty" element={<Navigate replace to="/faculty/home" />} />
          <Route path="/faculty/home" element={
            <RouteGuard requiredRole="faculty">
              <FacultyHome />
            </RouteGuard>
          } />
          <Route path="/faculty/timetable" element={
            <RouteGuard requiredRole="faculty">
              <AdminTimetable />
            </RouteGuard>
          } />
          <Route path="/faculty/announcements" element={
            <RouteGuard requiredRole="faculty">
              <FacultyAnnouncements />
            </RouteGuard>
          } />
          <Route path="/faculty/post-announcement" element={
            <RouteGuard requiredRole="faculty">
              <PostAnnouncement />
            </RouteGuard>
          } />
          <Route path="/faculty/submissions" element={
            <RouteGuard requiredRole="faculty">
              <FacultySubmissions />
            </RouteGuard>
          } />
          <Route path="/faculty/class-average" element={
            <RouteGuard requiredRole="faculty">
              <ClassAverage />
            </RouteGuard>
          } />
          <Route path="/faculty/students" element={
            <RouteGuard requiredRole="faculty">
              <FacultyStudents />
            </RouteGuard>
          } />
          <Route path="/faculty/profile" element={
            <RouteGuard requiredRole="faculty">
              <FacultyProfile />
            </RouteGuard>
          } />

          {/* Fallbacks */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
