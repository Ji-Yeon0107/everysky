import React from "react";
import firebase from "fbase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Auth = () => {
  const auth = getAuth();

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
  };

  return (
    <div>
      <button name="google" onClick={onSocialClick}>
        Google 계정으로 로그인
      </button>
    </div>
  );
};

export default Auth;
