import React, { useState } from "react";
import firebase from "fbase";
import { getFirestore, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, deleteObject, ref } from "firebase/storage";
import "style/posting.css";

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

  const getTimegap = (posting) => {
    const msgap = Date.now() - posting.createdAt;
    const minutegap = Math.floor(msgap / 60000);
    const hourgap = Math.floor(msgap / 3600000);

    if (msgap < 0) {
      return <p>0분전</p>;
    }
    if (hourgap > 24) {
      return <p>{posting.createdDate}</p>;
    }
    if (minutegap > 60) {
      return <p>{hourgap}시간 전</p>;
    } else {
      return <p>{minutegap}분 전</p>;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(firestore, "postings", `${posting.id}`), {
      text: postingEditing,
      creator: posting.creator,
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

  const toggleEditing = (e) => {
    e.preventDefault();
    setEditing((prev) => !prev);
  };

  return (
    <div>
      {editing && (
        <>
          <form onSubmit={onSubmit} className="edit">
            <input
              onChange={onChange}
              type="text"
              value={postingEditing}
              required
            />
            <input type="submit" value="수정" />
          </form>
          <input
            type="submit"
            value="취소"
            className="edit-button"
            onClick={toggleEditing}
          />
        </>
      )}
      <div className="posting-box">
        <h4 className="posting-text">{posting.text}</h4>
        <img
          onClick={onClickImage}
          className="attachmentImage"
          src={posting.attachmentUrl}
          width="100px"
        />
        <div className="posting-author">작성자 : {posting.creator}</div>
        <div className="posting-time">{getTimegap(posting)}</div>
        {isOwner && (
          <div className="posting-button">
            <button onClick={onDeleteClick}>삭제</button>
            <button onClick={toggleEditing}>수정</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posting;
