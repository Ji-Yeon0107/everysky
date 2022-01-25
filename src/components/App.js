import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import firebase from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        });
      } else {
        setUserObj(null);
        setIsLoggedIn(false);
      }
      setTimeout(() => {
        setInit(true);
      }, 500);
    });
  }, []);
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          setInit={setInit}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        <div>일상 기록</div>
      )}
    </>
  );
}

export default App;
