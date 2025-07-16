import React, { useState, useEffect } from "react";
import "./registration.css";

export default function RegistrationPage() {
  const [offerings, setOfferings] = useState([]);
  const [registrations, setRegistrations] = useState(() => {
    const stored = localStorage.getItem("registrations");
    return stored ? JSON.parse(stored) : [];
  });

  const [studentName, setStudentName] = useState("");
  const [selectedOffering, setSelectedOffering] = useState("");
  const [filterType, setFilterType] = useState("");
  const [courseTypes, setCourseTypes] = useState([]);

  useEffect(() => {
    const storedOfferings = localStorage.getItem("offerings");
    const storedTypes = localStorage.getItem("courseTypes");
    if (storedOfferings) setOfferings(JSON.parse(storedOfferings));
    if (storedTypes) setCourseTypes(JSON.parse(storedTypes));
  }, []);

  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  const registerStudent = () => {
    const trimmedName = studentName.trim();

    if (!trimmedName || !selectedOffering) {
      alert("Please enter a student name and select a course offering.");
      return;
    }

    const newEntry = {
      id: Date.now(), // optional unique ID
      name: trimmedName,
      offering: selectedOffering,
    };

    setRegistrations([...registrations, newEntry]);
    setStudentName("");
    setSelectedOffering("");
  };

  const deleteStudent = (idToDelete) => {
    const updated = registrations.filter((r) => r.id !== idToDelete);
    setRegistrations(updated);
  };

  const filteredOfferings = filterType
    ? offerings.filter((off) => off.startsWith(filterType))
    : offerings;

  const getStudentsForOffering = (offering) =>
    registrations.filter(
      (r) => r.offering === offering && r.name && r.name.trim() !== ""
    );

  return (
    <div className="container">
      <h1>👨‍🎓 Student Registration</h1>

      <div>
        <label>Filter by Course Type: </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All</option>
          {courseTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <select
          value={selectedOffering}
          onChange={(e) => setSelectedOffering(e.target.value)}
        >
          <option value="">-- Select Offering --</option>
          {filteredOfferings.map((offering, index) => (
            <option key={index} value={offering}>
              {offering}
            </option>
          ))}
        </select>
        <button  className="delete"donClick={registerStudent}>Register</button>
      </div>

      <h3 style={{ marginTop: "2rem" }}>📋 Registered Students</h3>
      {filteredOfferings.map((offering, i) => {
        const students = getStudentsForOffering(offering);
        return (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <h4>{offering}</h4>
            {students.length > 0 ? (
              <ul>
                {students.map((r) => (
                  <li key={r.id} style={{ marginBottom: "0.5rem" }}>
                    {r.name}
                    <button
                      style={{
                        marginLeft: "10px",
                        color: "white",
                        backgroundColor: "red",
                        border: "none",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteStudent(r.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#999", fontStyle: "italic" }}>No students registered.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
