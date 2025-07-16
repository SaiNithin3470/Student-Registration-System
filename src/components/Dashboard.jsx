import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css'; // Assuming you have a CSS file for styling

export default function Dashboard() {
  const navigate = useNavigate();

  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const types = JSON.parse(localStorage.getItem("courseTypes")) || [];
    const crs = JSON.parse(localStorage.getItem("courses")) || [];
    const offs = JSON.parse(localStorage.getItem("offerings")) || [];
    const regs = JSON.parse(localStorage.getItem("registrations")) || [];

    setCourseTypes(types);
    setCourses(crs);
    setOfferings(offs);
    setRegistrations(regs);
  }, []);

  return (
    <div  className="container">
      <h2 className="heading">📊 Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "3rem" }}>
        <div style={cardStyle} onClick={() => navigate("/CourseTypes")}>
          <h3>Total Course Types</h3>
          <p>{courseTypes.length}</p>
        </div>
        <div style={cardStyle} onClick={() => navigate("/Courses")}>
          <h3>Total Courses</h3>
          <p>{courses.length}</p>
        </div>
        <div style={cardStyle} onClick={() => navigate("/offerings")}>
          <h3>Total Course Offerings</h3>
          <p>{offerings.length}</p>
        </div>
        <div style={cardStyle} onClick={() => navigate("/registrations")}>
          <h3>Total Registrations</h3>
          <p>{registrations.length}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "1rem",
  cursor: "pointer",
  transition: "0.2s",
  borderRadius: "8px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
};
