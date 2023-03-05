import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Page404 from "./pages/Page404";
import { initDatabase } from "./utils/initDatabase";
import { LoginForm } from "./pages/LoginForm";
import { LeadsPage } from "./pages/LeadsPage";
import userData from "./data/users.json";
import { setUserStatus } from "./utils/setUserStatus";

const App = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(userData);
  const [loggedInUserId, setLoggedInUserId] = useState();

  // initialize localstorage database
  useEffect(() => {
    initDatabase();
  }, []);

  useEffect(() => {
    // check if we have a logged in user already
    const prevLoggedInUser = localStorage.getItem("userId");
    if (prevLoggedInUser) {
      setLoggedInUserId(prevLoggedInUser);
    }
  }, []);

  const logout = () => {
    setUserStatus(loggedInUserId, "inactive");
    setLoggedInUserId(undefined);
    navigate("/");
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LoginForm users={users} setLoggedInUserId={setLoggedInUserId} />
          }
        />

        <Route
          path="/leads"
          element={
            <LeadsPage
              users={users}
              loggedInUserId={loggedInUserId}
              logout={logout}
            />
          }
        />

        <Route path="*" element={<Page404 />} />

        {/* <Route path="/leads/:emailId" element={<Emails />} /> */}
      </Routes>
    </div>
  );
};

export default App;