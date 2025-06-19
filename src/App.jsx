import "./App.css";
import { Routes, Route } from "react-router-dom";
//import auth
import ProtectedRoute from "./Auth/ProtectedRoute";
import LogIn from "./Auth/LogIn";
import SignUp from "./Auth/SignUp";
import UnAuthenticated from "./Auth/UnAuthenticated";
import LandingPage from "./LandingPage";
//import admin
import Courses from "./Admin/Pages/Courses";
import Profile from "./Admin/Pages/Profile";
import Mails from "./Admin/Pages/Mails";
import CourseTabs from "./Admin/Pages/CourseTabs";
//import subAdmin
import CoursesSA from "./SubAdmin/Pages/CoursesSA";
import ProfileSA from "./SubAdmin/Pages/ProfileSA";
import MailsSA from "./SubAdmin/Pages/MailsSA";
import SubAdminCourseTabs from "./SubAdmin/Pages/SubAdminCourseTabs";
//import teacher
import CoursesT from "./Teacher/Pages/CoursesT";
import ProfileT from "./Teacher/Pages/ProfileT";
import MailsT from "./Teacher/Pages/MailsT";
import TeacherCourseTabs from "./Teacher/Pages/TeacherCourseTabs";
//import student
import CoursesS from "./Student/Pages/CoursesS";
import ProfileS from "./Student/Pages/ProfileS";
import MailsS from "./Student/Pages/MailsS";
import StudentCourseTabs from "./Student/Pages/StudentCourseTabs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/unAuthenticated" element={<UnAuthenticated />} />
        <Route path="/" element={<LandingPage />} />
        {/*protected routes for Admin */}
        <Route
          path="/Admin/Courses"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/Profile"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/Mails"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Mails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin/CourseTabs"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CourseTabs />
            </ProtectedRoute>
          }
        />
        {/*protected routes for SubAdmin */}
        <Route
          path="/SubAdmin/CoursesSA"
          element={
            <ProtectedRoute roles={["subAdmin"]}>
              <CoursesSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SubAdmin/ProfileSA"
          element={
            <ProtectedRoute roles={["subAdmin"]}>
              <ProfileSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SubAdmin/MailsSA"
          element={
            <ProtectedRoute roles={["subAdmin"]}>
              <MailsSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SubAdmin/CourseTabs"
          element={
            <ProtectedRoute roles={["subAdmin"]}>
              <SubAdminCourseTabs />
            </ProtectedRoute>
          }
        />
        {/*protected routes for Teacher */}
        <Route
          path="/Teacher/CoursesT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <CoursesT />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher/ProfileT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <ProfileT />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher/MailsT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <MailsT />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher/CourseTabs"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <TeacherCourseTabs />
            </ProtectedRoute>
          }
        />
        {/*protected routes for Student */}
        <Route
          path="/Student/CoursesS"
          element={
            <ProtectedRoute roles={["student"]}>
              <CoursesS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student/ProfileS"
          element={
            <ProtectedRoute roles={["student"]}>
              <ProfileS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student/MailsS"
          element={
            <ProtectedRoute roles={["student"]}>
              <MailsS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student/CourseTabs"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentCourseTabs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
