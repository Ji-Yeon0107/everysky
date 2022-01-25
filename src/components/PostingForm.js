import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Postings from "components/Postings";
import firebase from "fbase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import "style/posting.css";

const PostingForm = ({ userObj }) => {
  const firestore = getFirestore();
  const firebaseStorage = getStorage();

  //날짜
  const getToday = new Date();
  const year = getToday.getFullYear();
  const month = getToday.getMonth() + 1;
  const date = getToday.getDate();
  const today = `${year}년 ${month}월 ${date}일`;

  const [attachment, setAttachment] = useState("");
  const [newPosting, setNewPosting] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj !== null) {
      let attachmentUrl = "";

      if (attachment !== "") {
        const attachmentRef = ref(
          firebaseStorage,
          `${userObj.uid}/${uuidv4()}`
        );
        const response = await uploadString(
          attachmentRef,
          attachment,
          "data_url"
        );
        attachmentUrl = await getDownloadURL(attachmentRef);
      }
      const postingObj = {
        text: newPosting,
        creator: userObj.displayName,
        createdDate: today,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      };

      await addDoc(collection(firestore, "postings"), postingObj);
      setNewPosting("");
      setAttachment("");
    } else {
      const confirmLogin = window.confirm("로그인하고 글을 남겨보세요!");
      if (confirmLogin) {
        window.location.href = "/#/login";
      }
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPosting(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
    console.log(attachment);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  return (
    <>
      <form onSubmit={onSubmit} className="posting-form">
        <input
          type="text"
          value={newPosting}
          onChange={onChange}
          placeholder="무슨 생각하세요?"
          maxLength={120}
          required
        />
        <input type="submit" value="✏️" />
        <input type="file" accept="image/*" onChange={onFileChange} />

        {attachment && (
          <div>
            <img src={attachment} width="100px" />
            <button onClick={onClearAttachment}>지우기</button>
          </div>
        )}
      </form>
      <Postings userObj={userObj} />
    </>
  );
};

export default PostingForm;
