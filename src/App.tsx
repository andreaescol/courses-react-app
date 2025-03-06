import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Registration from "./components/Authentication/Registration";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import CreateCourse from "./components/CourseForm/CourseForm";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/courses" /> : <Navigate to="/registration" />
          }
        />

        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseInfo />} />
        <Route
          path="/courses/add"
          element={
            <PrivateRoute Component={CreateCourse} requiredRole="ADMIN" />
          }
        />
      </Routes>
    </>
  );
};

export default App;
