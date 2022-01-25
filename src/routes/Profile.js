import React, { useEffect, useState } from "react";
import firebase from "fbase";
import { getAuth, updateProfile } from "firebase/auth";
import MyPostings from "components/MyPostings";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";

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
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc, index) => {
      let docdata = querySnapshot.docs.map((doc) => doc.data());
      setMyPostings(docdata);
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
