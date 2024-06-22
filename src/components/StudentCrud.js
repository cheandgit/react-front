import axios from "axios";
import { useEffect, useState } from "react";

const STUDAPI = axios.create({
  //baseURL: "https://localhost:7297"  // работает c запущенным локальным сервером
  //baseURL: "http://localhost:8090"
  baseURL: "https://e266-94-140-153-169.ngrok-free.app"
  //baseURL: "https://194.87.239.124"  // https - не работает!
});

function StudentCrud() {

  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
 
  useEffect(() => {
    (async () => await Load())();
  }, []);

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     try {
  //       const response = await STUDAPI.get("/api/student/getStudents", {
  //         headers: {
  //           'ngrok-skip-browser-warning': 'true'
  //         }
  //       });
  //       console.log('Fetched students:', response.data); // Log the response data
  //       setStudents(response.data);
  //     } catch (err) {
  //       console.error('Error fetching students:', err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchStudents();
  // }, []);

  async function Load() {
    const headers = {
      "accept": "text/plain","ngrok-skip-browser-warning": "true"
    };
    //const result = await axios.get("https://localhost:7297/api/Student/GetStudent", { headers } );  // оригинал
    const result = await STUDAPI.get("/api/student/getStudents", { headers } );
    setStudents(result.data);
    console.log(result.data);
  }
 
  async function save(event) {
   
    event.preventDefault();
    try {
      await STUDAPI.post("/api/Student/AddStudent", {
        name: stname,
        course: course,
       
      });
      alert("Student Registation Successfully");
          setId("");
          setName("");
          setCourse("");
      Load();
    } catch (err) {
      alert(err);
    }
  }
  async function editStudent(students) {
    setName(students.name);
    setCourse(students.course);
    setId(students.id);
  }
 
  async function DeleteStudent(id) {
  await STUDAPI.delete("/api/Student/DeleteStudent/" + id);
   alert("Employee deleted Successfully");
   setId("");
   setName("");
   setCourse("");
   Load();
  }
 
  async function update(event) {
    event.preventDefault();
    try {
  await STUDAPI.patch("/api/Student/UpdateStudent/"+ students.find((u) => u.id === id).id || id,
        {
        id: id,
        name: stname,
        course: course,
        }
      );
      alert("Registation Updated");
      setId("");
      setName("");
      setCourse("");
     
      Load();
    } catch (err) {
      alert(err);
    }
  }
    return (
      <div>
      <h2 align="center">Student Details</h2>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Student Name</label>
            <input
              type="text"
              class="form-control"
              id="stname"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Course</label>
            <input
              type="text"
              class="form-control"
              id="course"
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>Register</button>&nbsp;&nbsp;
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
      
      <div class="container mt-4">
      <table class="table table-striped" align="center">
        <thead>
          <tr class="table-secondary">
            <th scope="col">#</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {Array.isArray(students) && students.length > 0 ? (
        students.map((student, index) => (
        <tbody key={student.id}>
        <tr>
          {/* <th scope="row">{student.id} </th> */}
          <th scope="row">{index + 1}</th> 
          <td>{student.name}</td>
          <td>{student.course}</td>
          <td>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => editStudent(student)}>Edit
          </button>&nbsp;&nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => DeleteStudent(student.id)}>Delete
          </button>
          </td>
        </tr>
        </tbody>
      ))) : (
      <tbody>
      <tr>
        <td colSpan="4">No students available</td>
      </tr>
      </tbody>
      )}
      </table>
      </div>
      </div>
    );}

  export default StudentCrud;
  