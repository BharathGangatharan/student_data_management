import { useState,useEffect } from 'react';
import {Routes, Route } from 'react-router-dom';
import Login from "./screens/login/Login";
import Student from "./screens/student/Student";
import Staff from "./screens/staff/StaffMain";
import Header from './components/header/Header';
import StaffMarkAndAttendance from './screens/staff/StaffMarkAndAttendance';
import StaffMarks from './screens/staff/StaffMarks';
import Loader from './components/loading/Loader';

function App() {
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{

    setTimeout(()=>{
      setIsLoading(false);
    },1500)

  },[]);

  return (
      <div>
        {
          window.location.pathname !== "/" ? <Header /> : null
        }
        {
          isLoading ? <Loader /> : 
          (
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/student" element={<Student/> }/>
              <Route path="/staff" element={<Staff/> }/>
              <Route path="/staff/marks-attendance?/:id" element={<StaffMarkAndAttendance/>}/>
              <Route path="/staff/marks/:id" element={<StaffMarks/>}/>
            </Routes>

          )
        }
      </div>
  );
}

export default App;
