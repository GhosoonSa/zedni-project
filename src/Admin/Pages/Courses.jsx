import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../Components/AdminHeader";
import books from "/77221.jpg";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // fetch courses
    const fetchCourses = async () => {
      try {
        // if (!token) {
        //   navigate("/LogIn");
        //   return;
        // }
        const response = await axios.get(
          //   "http://localhost:8000/api/trainer/getarticle",
          {
            headers: {
              Accept: "application/json",
              // Authorization: `Bearer ` + token,
            },
          }
        );
        console.log("responses " + response.data.articles);

        if (response.data && response.data.courses) {
          setCourses(response.data.courses);
          console.log("Courses set to state:", response.data.message);
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
    //put token or courses in the []
  }, []);
  return (
    <>
      <AdminHeader />
      <div
        className="bg-cover h-screen w-screen"
        style={{ backgroundImage: `url(${books})` }}
      >
        <h1>courses</h1>
      </div>
    </>
  );
};

export default Courses;
