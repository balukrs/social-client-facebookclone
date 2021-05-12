import React, { useEffect } from "react";
import "./postdetails_style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../../actions";
import Postdata from "./postcomp";

const Postdetails = () => {
  const dispatch = useDispatch();
  const postIds = useSelector((state) => state.postdata.postids);
  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const Posts = () => {
    return postIds.map((postid, index) => <Postdata id={postid} key={index} />);
  };

  return <div className="postdetails_cont">{Posts()}</div>;
};

export default Postdetails;
