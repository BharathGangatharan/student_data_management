import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./screens/login/Login";
import Student from "./screens/student/Student";
import Staff from "./screens/staff/StaffMain";
import StaffMarkAndAttendance from "./screens/staff/StaffMarkAndAttendance";
import StaffMarks from "./screens/staff/StaffMarks";
import StaffProfile from "./screens/staff/StaffProfile";
import MarksApproval from "./screens/staff/MarksApproval";
import AdminTimeTable from "./screens/adminTimeTable/AdminTimeTable";
import Task from "./screens/staff/Task";
import "./styles/main.scss";
import Layout from "./screens/Layout";
import AutoLogout from './screens/AutoLogout';
import ScrollTop from './components/scrollTop/ScrollTop';
import {useSelector} from 'react-redux';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const loginState = useSelector((state)=>state?.loginReducer?.login);

  useEffect(() => {
    const getLoginState = localStorage.getItem("isLoggedIn");
    const getUserRole = loginState?.ISADMIN;
    if(Boolean(getLoginState)){
      setIsLoggedIn(true);
      getUserRole === 1 ? setRole("admin"): setRole("staff")
    }
  }, [loginState]);

  return (
    <AutoLogout>
        <ScrollTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          {isLoggedIn ? (
              <Route path="/" element={<Layout />}>
              {role === "student" && <Route path="student" element={<Student />} />}
              {role === "staff" && (
                  <>
                    <Route path="staff" element={<Staff />} />
                    <Route
                        path="staff/marks-attendance/:id"
                        element={<StaffMarkAndAttendance />}
                    />
                    <Route path="staff/marks/:id" element={<StaffMarks />} />
                    <Route path="profile" element={<StaffProfile />} />
                    <Route path="approval" element={<MarksApproval />} />
                    <Route path="staff/task" element={<Task />} />
                  </>
              )}
              {role === "admin" && (
                  <>
                    <Route path="admin" element={<AdminTimeTable />} />
                    <Route path="profile" element={<StaffProfile />} />
                  </>
              )}
              </Route>
          ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
    </AutoLogout>
  );
}

export default App;
