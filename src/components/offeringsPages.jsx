
import React, { useState, useEffect } from "react";
import "./courseofferings.css";

export default function OfferingsPage() {
  const [courses, setCourses] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [offerings, setOfferings] = useState(() => {
    const stored = localStorage.getItem("offerings");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedCourseType, setSelectedCourseType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const storedCourses = localStorage.getItem("courses");
    const storedTypes = localStorage.getItem("courseTypes");
    if (storedCourses) setCourses(JSON.parse(storedCourses));
    if (storedTypes) setCourseTypes(JSON.parse(storedTypes));
  }, []);

  useEffect(() => {
    localStorage.setItem("offerings", JSON.stringify(offerings));
  }, [offerings]);

  const addOffering = () => {
    if (selectedCourse && selectedCourseType) {
      const newOffering = `${selectedCourseType} - ${selectedCourse}`;
      if (!offerings.includes(newOffering)) {
        setOfferings([...offerings, newOffering]);
      }
    }
  };

  const deleteOffering = (index) => {
    const updated = [...offerings];
    updated.splice(index, 1);
    setOfferings(updated);
  };

  return (
    <div className="container">
      <h1>📒 Course Offerings</h1>

      <div>
        <label>Course Type: </label>
        <select
          value={selectedCourseType}
          onChange={(e) => setSelectedCourseType(e.target.value)}
        >
          <option  className="option" value="">-- Select --</option>
          {courseTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Course: </label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select --</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <button onClick={addOffering}>Add Offering</button>

      <ul>
        {offerings.map((offering, index) => (
          <li key={index}>
            {offering}
            <button  className="dlt"onClick={() => deleteOffering(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
