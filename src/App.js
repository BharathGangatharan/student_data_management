import {Routes, Route } from 'react-router-dom';
import Login from "./screens/login/Login";
import Student from "./screens/student/Student";
import Staff from "./screens/staff/StaffMain";
import Header from './components/header/Header';
import StaffMarkAndAttendance from './screens/staff/StaffMarkAndAttendance';

function App() {
  return (
      <div>
        {window.location.pathname !== "/" ? <Header /> : null}{" "}
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/student" element={<Student/> }/>
          <Route path="/staff" element={<Staff/> }/>
          <Route path="/staff/marks-attendance/:id" element={<StaffMarkAndAttendance/>}/>
        </Routes>
      </div>
  );
}

export default App;
