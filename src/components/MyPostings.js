import React, { useState, useEffect } from "react";
import Posting from "components/Posting";
import firebase from "fbase";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";

const MyPostings = ({ userObj, myPostings }) => {
  const firestore = getFirestore();
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    onSnapshot(collection(firestore, "postings"), (snapshot) => {
      //모든문서를 map으로 돌려서 array를 만든다.
      const postingArray = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      //할당해준다
      setPostings(postingArray);
    });
  }, []);

  return (
    <div>
      <h2>내가 쓴 글</h2>
      {myPostings.map((posting) => {
        return (
          <div key={posting.id}>
            <Posting posting={posting} isOwner userObj={userObj} />
          </div>
        );
      })}
    </div>
  );
};
export default MyPostings;
