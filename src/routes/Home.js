import React from "react";
import PostingForm from "components/PostingForm";

const Home = ({ isLoggedIn, userObj, setMyPostings }) => {
  return (
    <div>
      <PostingForm isLoggedIn={isLoggedIn} userObj={userObj} />
    </div>
  );
};

export default Home;
