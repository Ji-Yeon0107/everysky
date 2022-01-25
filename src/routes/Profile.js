import React, { useEffect, useState } from "react";
import firebase from "fbase";
import { getAuth, updateProfile } from "firebase/auth";
import Postings from "components/Postings";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";

const Profile = ({ userObj, refreshUser }) => {
  const auth = getAuth();
  const firestore = getFirestore();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  //   const getMyPostings = async () => {
  //     const q = query(
  //       collection(firestore, "postings"),
  //       where("creatorId", "==", userObj.uid),
  //       orderBy("createdAt")
  //     );
  //   };
  //   const a = await getDocs(q);
  //   a.forEach((doc) => {});

  //   useEffect(() => {
  //     getMyPostings();
  //   });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={newDisplayName} />
        <input type="submit" value="닉네임 수정하기" />
      </form>
      <Postings userObj={userObj} />
    </div>
  );
};
export default Profile;
