import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import Comment from "../comment/Comment"
import { Button } from "react-bootstrap";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [coms,setcoms]= useState([]);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setcoms(res.data.categories);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  const [comm,setcomm]=useState("");

  const addcomment = async(e) =>{
    const x={
      comm_user: user.username,
      comm_desc: comm
    }
    post.categories.push(x)
   
    //console.log(post.categories);
    try {
      await axios.put(`/posts/${post._id}`, {
        username: post.username,
        title : post.title,
        desc : post.desc,
        categories: post.categories
      });
      window.location.replace("/post/"+post._id);
    } catch (err) {}
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      <h5 className="pl-3"><u>Comments</u></h5>
      <div className="container ">
        {coms.map((c)=>(
          <Comment  key={ Math.random().toString(36).substr(2, 9) } name={c.comm_user} cmnt={c.comm_desc} />
        ))}
      </div>
      
      <div className="container p-4">
          <div className="row">
              <div className="col">
              <b>{user.username}</b> : <input className="mx-2" type="text" width="5px" onChange={e=>setcomm(e.target.value)} placeholder="Add comment.."/>
              <Button  style={{borderRadius:"5px"}} onClick={addcomment}>Post</Button>
              </div>
          </div>
      </div> 
    </div>
  );
}
