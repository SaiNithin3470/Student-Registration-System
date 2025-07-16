import React,{useState,useEffect} from "react";
import "./coursetypes.css"

export default function CourseTypePage() {

const[courseTypes,setCourseTypes]=useState(()=>
{
    const stored=localStorage.getItem("courseTypes");
    return stored?JSON.parse(stored):[];
});
const [newType,setNewType]=useState("");
const [editingIndex,setEditingIndex]=useState(null);
const [editingValue,setEditingValue]=useState("");

 useEffect(() => {
    localStorage.setItem("courseTypes", JSON.stringify(courseTypes)
);} , [courseTypes]);

const addCourseType=()=>{
   if(newType.trim()!=="")
    {
        setCourseTypes([...courseTypes,newType]);
        setNewType("");

    } 
}
const deleteCourseType=(index)=>{
    const updated=[...courseTypes];
    updated.splice(index,1);
    setCourseTypes(updated);

}
const startEdit=(index)=>{
    setEditingIndex(index);
    setEditingValue(courseTypes[index]);
}
const saveEdit=()=>{
    const updated=[...courseTypes];
    updated[editingIndex]=editingValue;
    setCourseTypes(updated);
    setEditingIndex(null);
}
return(
    <div className="container">
        <h1 className="heading">Course Types</h1>
        <input
            type="text"className="edit-input"
            value={newType}
            onChange={(e)=>setNewType(e.target.value)}
            placeholder="Add new course type"/>
        <button  className="btn"onClick={addCourseType}>Add</button>
        <ul>
            {courseTypes.map((type, index) => (
          <li className="list" key={index}>
            {editingIndex === index ? (
              <>
                <input 
                  value={editingValue} className="edit-input1"
                  onChange={(e) => setEditingValue(e.target.value)}
                />
                <button className="btn1" onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                {type}
                <button  className="btn1"onClick={() => startEdit(index)}>Edit</button>
                <button className="btn1" onClick={() => deleteCourseType(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}






