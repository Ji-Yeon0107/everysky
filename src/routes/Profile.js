import React, { useEffect, useState } from "react";
import firebase from "fbase";
import { getAuth, updateProfile } from "firebase/auth";
import MyPostings from "components/MyPostings";
import {
  getFirestore,
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "style/profile.css";

const Profile = ({ userObj, refreshUser }) => {
  const auth = getAuth();
  const firestore = getFirestore();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myPostings, setMyPostings] = useState([]);

  const getMyPostings = async () => {
    const q = query(
      collection(firestore, "postings"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const docData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setMyPostings(docData);
    });
  };

  useEffect(() => {
    getMyPostings();
  }, []);

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
      {/* <Postings userObj={userObj} /> */}
      <MyPostings userObj={userObj} myPostings={myPostings} />
    </div>
  );
};
export default Profile;
