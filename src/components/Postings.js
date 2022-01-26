import React, { useState, useEffect } from "react";
import Posting from "components/Posting";
import firebase from "fbase";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Postings = ({ userObj }) => {
  const firestore = getFirestore();
  const [postings, setPostings] = useState([]);

  const getPostings = async () => {
    const q = query(
      collection(firestore, "postings"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const docData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPostings(docData);
    });
  };

  useEffect(() => {
    getPostings();
  }, []);

  return (
    <div>
      {postings.map((posting) => {
        return (
          <div key={posting.id}>
            {userObj !== null ? (
              <Posting
                posting={posting}
                isOwner={userObj.uid === posting.creatorId}
                userObj={userObj}
              />
            ) : (
              <Posting posting={posting} userObj={userObj} />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Postings;
