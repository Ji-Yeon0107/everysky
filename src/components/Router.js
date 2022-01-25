import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "routes/Home";
import Login from "routes/Login";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, setIsLogeedIn, userObj, refreshUser }) => {
  return (
    <Router>
      <Navigation
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLogeedIn}
        userObj={userObj}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              setIsLoggedin={setIsLogeedIn}
              userObj={userObj}
            />
          }
        />
        {userObj !== null ? (
          <Route
            path="/profile"
            element={<Profile userObj={userObj} refreshUser={refreshUser} />}
          />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
