import React, { useState } from "react";
import firebase from "fbase";
import { getFirestore, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, deleteObject, ref } from "firebase/storage";

const Posting = ({ isOwner, posting }) => {
  const firestore = getFirestore();
  const firebaseStorage = getStorage();
  const [editing, setEditing] = useState(false);
  const [postingEditing, setPostingEditing] = useState(posting.text);

  const onClickImage = () => {
    var modalImage = document.querySelector(".attachmentImage");
    modalImage.className += "modal";
    //modal에 css 효과 주기
    //창을 닫을때 추가된 className을 지우도록 바꿔주자!
    // console.log(modalImage.className);
  };

  const getTimegap = (a) => {
    if (Date.now() - a.createdAt < 86400000) {
      if (Math.floor((Date.now() - a.createdAt) / 60000) < 60) {
        return <p>{Math.floor((Date.now() - a.createdAt) / 60000)}분 전</p>;
      } else {
        return <p>{Math.floor((Date.now() - a.createdAt) / 3600000)}시간 전</p>;
      }
    } else {
      return <p>{a.createdDate}</p>;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(firestore, "postings", `${posting.id}`), {
      text: postingEditing,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPostingEditing(value);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(firestore, "postings", `${posting.id}`));
      await deleteObject(ref(firebaseStorage, posting.attachmentUrl));
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  console.log(posting);
  return (
    <div>
      {editing && (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              value={postingEditing}
              required
            />
            <input type="submit" value="수정" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      )}
      <div>
        <h4>{posting.text}</h4>
        <img
          onClick={onClickImage}
          className="attachmentImage"
          src={posting.attachmentUrl}
          width="100px"
        />
        <div>작성자 : {posting.creator}</div>
        <div>{getTimegap(posting)}</div>
      </div>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button onClick={toggleEditing}>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Posting;
