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
          path="/Courses"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Mails"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Mails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CourseTabs"
          element={
            <ProtectedRoute roles={["admin"]}>
              <CourseTabs />
            </ProtectedRoute>
          } 
          />
            <Route
  path="/admin/course/:id"
  element={
    <ProtectedRoute roles={["admin"]}>
      <CourseTabs />
    </ProtectedRoute>
  }
        />
        {/*protected routes for SubAdmin */}
        <Route
          path="/CoursesSA"
          element={
            <ProtectedRoute roles={["subAdmin"]}>
              <CoursesSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfileSA"
          element={
            <ProtectedRoute roles={["subAdmin"]}>
              <ProfileSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MailsSA"
          element={
            <ProtectedRoute roles={["subAdmin"]}>
              <MailsSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SubAdminCourseTabs"
          element={
            <ProtectedRoute roles={["subAdmin"]}>
              <SubAdminCourseTabs />
            </ProtectedRoute>
          }
        />
        {/*protected routes for Teacher */}
        <Route
          path="/CoursesT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <CoursesT />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfileT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <ProfileT />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MailsT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <MailsT />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TeacherCourseTabs"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <TeacherCourseTabs />
            </ProtectedRoute>
          }
            />
        <Route
  path="/teacher/course/:id"
  element={
    <ProtectedRoute roles={["teacher"]}>
      <TeacherCourseTabs />
    </ProtectedRoute>
  }
          
        />
        {/*protected routes for Student */}
        <Route
          path="/CoursesS"
          element={
            <ProtectedRoute roles={["student"]}>
              <CoursesS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfileS"
          element={
            <ProtectedRoute roles={["student"]}>
              <ProfileS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MailsS"
          element={
            <ProtectedRoute roles={["student"]}>
              <MailsS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/StudentCourseTabs"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentCourseTabs />
            </ProtectedRoute>
          }
        />
        <Route path="/student/course/:id" element={<StudentCourseTabs />} />
      </Routes>
    </>
  );
}

export default App;
