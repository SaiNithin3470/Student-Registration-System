
import React, { useState, useEffect } from "react";
import "./coursepages.css";

export default function CoursePage() {
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem("courses");
    return stored ? JSON.parse(stored) : [];
  });

  const [newCourse, setNewCourse] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const addCourse = () => {
    if (newCourse.trim() !== "") {
      setCourses([...courses, newCourse.trim()]);
      setNewCourse("");
    }
  };

  const deleteCourse = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(courses[index]);
  };

  const saveEdit = () => {
    const updated = [...courses];
    updated[editIndex] = editValue.trim();
    setCourses(updated);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="container">
      <h1 className="heading">Courses</h1>

      <input
        type="text" className="edit-input"
        placeholder="Add new course"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
      />
      <button  className="btn" onClick={addCourse}>Add</button>

      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  value={editValue} className="edit-input1"
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                {course}
                <button className="btn1" onClick={() => startEdit(index)}>Edit</button>
                <button className="btn1"onClick={() => deleteCourse(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
