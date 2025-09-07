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
import People from "./Admin/Pages/People";
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
import PeopleSA from "./SubAdmin/Pages/PeopleSA";
import PeopleT from "./Teacher/Pages/PeopleT";
import AddWorksheet from "./Teacher/Pages/AddWorkSheet";
import WorksheetsBySubject from "./Teacher/Pages/WorkSheet";
import WorksheetDetails from "./Teacher/Pages/WorkSheetDetails";
import AddQuestion from "./Teacher/Pages/AddQuestion";
import SubmitAnswers from "./Teacher/Pages/SubmitAnswers";
import WorksheetsStudents from "./Student/Pages/WorkSheetS";
import SubmitAnswersStudent from "./Student/Pages/SubmitAnswersS";
import WorksheetDetailsS from "./Student/Pages/WorkSheetDetailsS";

import StudentAnswers from "./Student/Pages/StudentAnswers";
import SentMessagesT from "./Teacher/Pages/SentMessagesT";
import ReceivedMessagesT from "./Teacher/Pages/ReceivedMessagesT";
import SentMessagesS from "./Student/Pages/SentMessagesS";
import ReceivedMessagesS from "./Student/Pages/ReceivedMessagesS";
import SentMessagesAdmin from "./Admin/Pages/SentMessagesAdmin";
import ReceivedMessagesAdmin from "./Admin/Pages/ReceivedMessagesAdmin";
import SentMessagesSubAdmin from "./SubAdmin/Pages/SentMessagesSubAdmin";
import ReceivedMessagesSubAdmin from "./SubAdmin/Pages/ReceivedMessagesSubAdmin";

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
          path="/People"
          element={
            <ProtectedRoute roles={["admin"]}>
              <People />
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
        <Route
          path="/sentMessagesAdmin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <SentMessagesAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reccivedMessagesAdmin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ReceivedMessagesAdmin />
            </ProtectedRoute>
          }
        />
        {/*protected routes for SubAdmin */}
        <Route
          path="/CoursesSA"
          element={
            <ProtectedRoute roles={["subadmin"]}>
              <CoursesSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfileSA"
          element={
            <ProtectedRoute roles={["subadmin"]}>
              <ProfileSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/MailsSA"
          element={
            <ProtectedRoute roles={["subadmin"]}>
              <MailsSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PeopleSA"
          element={
            <ProtectedRoute roles={["subadmin"]}>
              <PeopleSA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SubAdminCourseTabs"
          element={
            <ProtectedRoute roles={["subadmin"]}>
              <SubAdminCourseTabs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sentMessagesSubAdmin"
          element={
            <ProtectedRoute roles={["subadmin"]}>
              <SentMessagesSubAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reccivedMessagesSubAdmin"
          element={
            <ProtectedRoute roles={["subadmin"]}>
              <ReceivedMessagesSubAdmin />
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
          path="/PeopleT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <PeopleT />
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
        <Route
          path="/AddWorkSheetT/:subjectId"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <AddWorksheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Worksheets/:id"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <WorksheetsBySubject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worksheet/:id"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <WorksheetDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddQuestion/:id"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <AddQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SubmitAnswers/:id"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <SubmitAnswers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sentMessagesT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <SentMessagesT />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reccivedMessagesT"
          element={
            <ProtectedRoute roles={["teacher"]}>
              <ReceivedMessagesT />
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
        <Route
          path="/WorksheetsS/:id"
          element={
            <ProtectedRoute roles={["student"]}>
              <WorksheetsStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SubmitAnswersS/:id"
          element={
            <ProtectedRoute roles={["student"]}>
              <SubmitAnswersStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worksheetDetailsS/:id"
          element={
            <ProtectedRoute roles={["student"]}>
              <WorksheetDetailsS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/StudentAnswers/:id"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentAnswers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sentMessagesS"
          element={
            <ProtectedRoute roles={["student"]}>
              <SentMessagesS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reccivedMessagesS"
          element={
            <ProtectedRoute roles={["student"]}>
              <ReceivedMessagesS />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
