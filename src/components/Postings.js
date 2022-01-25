import React, { useState, useEffect } from "react";
import Posting from "components/Posting";
import firebase from "fbase";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

const Postings = ({ userObj }) => {
  const firestore = getFirestore();
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    onSnapshot(collection(firestore, "postings"), (snapshot) => {
      //모든문서를 map으로 돌려서 array를 만든다.
      const postingArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //할당해준다
      setPostings(postingArray);
    });
  }, []);

  const orderPostings = async () => {
    const q = query(
      collection(firestore, "postings"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc, index) => {
      let docdata = querySnapshot.docs.map((doc) => doc.data());
      setPostings(docdata);
    });
  };
  useEffect(() => {
    orderPostings();
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
