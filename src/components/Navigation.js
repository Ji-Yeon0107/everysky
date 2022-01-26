import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "fbase";
import { getAuth, signOut } from "firebase/auth";
import "style/navigation.css";

const Navigation = ({ userObj, isLoggedIn }) => {
  const auth = getAuth();
  const onLogOutClick = () => {
    signOut(auth);
  };
  const [userProfile, setUserProfile] = useState("익명의 방문자");

  useEffect(() => {
    if (userObj !== null) {
      setUserProfile(userObj.displayName);
    } else {
      setUserProfile("익명의 방문자");
    }
  });

  return (
    <nav>
      <ul className="navi">
        <li>
          <div>
            {userObj !== null ? (
              <img
                src={userObj.photoURL}
                className="profilephoto"
                alt="profile"
              />
            ) : (
              <img
                src="./anonymous.png"
                className="profilephoto"
                alt="profile"
              />
            )}
          </div>
          {isLoggedIn ? (
            <>
              <Link to="/profile">{userProfile}님 반가워요</Link>
              <button className="logout-button" onClick={onLogOutClick}>
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login">{userProfile}님 반가워요</Link>
          )}
        </li>
        <li>
          <Link to="/">글 목록으로</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
