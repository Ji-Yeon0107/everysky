import React, { useState, useEffect } from "react";
import Posting from "components/Posting";
import firebase from "fbase";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";

const MyPostings = ({ userObj, myPostings }) => {
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
