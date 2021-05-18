import React, { useEffect, useRef } from "react";
import "./postdetails_style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../../actions";
import Postdata from "./postcomp";

const Postdetails = () => {
  const dispatch = useDispatch();
  const postIds = useSelector((state) => state.postdata.postids);
  const postStatus = useSelector((state) => state.postdata.poststatus);

  const messagesEndRef = useRef();

  useEffect(() => {
    dispatFunc();
  }, [dispatch, postStatus]);

  const Posts = () => {
    return postIds.map((postid, index) => <Postdata id={postid} key={index} />);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
      alignToTop: false,
    });
  };

  const dispatFunc = async () => {
    await dispatch(fetchPost());
    scrollToBottom();
  };

  return (
    <div className="postdetails_cont">
      {Posts()}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Postdetails;
