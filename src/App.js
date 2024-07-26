import {Routes, Route } from 'react-router-dom';
import Login from "./screens/login/Login";
import Student from "./screens/student/Student";
import Staff from "./screens/staff/StaffMain";
import StaffMarkAndAttendance from './screens/staff/StaffMarkAndAttendance';
import StaffMarks from './screens/staff/StaffMarks';
import StaffProfile from './screens/staff/StaffProfile';
import './styles/main.scss';
import PrivateRoute from './screens/PrivateRoute';
import Layout from './screens/Layout';

function App() {
    const checkLoginState = localStorage.getItem('isLoggedIn');

  return (
      <>
        {

            <Routes>
                <Route path="/" exact element={<Layout />} >
            
                     <Route path="/login" element={<Login/>}/>
                    
                    <Route element={<PrivateRoute roles={["student"]} />}>
                        <Route path="/student" element={<Student/>}/>
                    </Route>

                    <Route element={<PrivateRoute roles={["staff"]} />}>
                        <Route path="/staff" element={<Staff/> }/>
                        <Route path="/staff/marks-attendance?/:id" element={<StaffMarkAndAttendance/>}/>
                        <Route path="/staff/marks/:id" element={<StaffMarks/>}/>
                        <Route path="/profile" element={<StaffProfile />}/>
                    </Route>
            
                </Route>
            </Routes>
        }
      </>
  );
}

export default App;
