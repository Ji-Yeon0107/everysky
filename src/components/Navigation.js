import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "fbase";
import { getAuth, signOut } from "firebase/auth";

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
      <ul>
        <li>
          <div>{isLoggedIn ? "프로필img" : "기본프로필img"}</div>
          {isLoggedIn ? (
            <>
              <Link to="/profile">{userProfile}님 반가워요</Link>
              <button onClick={onLogOutClick}>Log Out</button>
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
