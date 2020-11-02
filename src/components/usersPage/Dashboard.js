import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import UserContext from '../../context/userContext';
import axios from "axios";
import Login from "../auth/Login";
import "../../styles/Dashboard.css";

export default function Dashboard() {
    const { userData } = useContext(UserContext);
    const [allPosts, setAllPosts] = useState([]);




    const getUserPosts = async () => {
        try {
            const posts = await axios("http://localhost:3001/posts/userPosts/" + userData.user.id);
            // console.log(posts.data);
            setAllPosts(posts.data);

        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getUserPosts();
    }, [userData]);


    const deletePost = async (event) => {
        console.log(event.target.id);
        await axios.delete("http://localhost:3001/posts/deletePost/" + event.target.id);
        getUserPosts();
    }



    return (
        <div className="Dashboard-page main-container">
            {
                (!userData.user) ? <Login /> :
                    <>
                        <h2 className="user-title"><i className="fas fa-user-alt"></i> {userData.user.displayName} </h2>
                        <Link to="/user/newPost" className="create-new-post">
                            <i className="fas fa-plus-circle"></i> Create new Post</Link>

                        <ul className="user-all-posts">
                            {
                                (allPosts.length === 0) ? <p>No posts</p> :
                                    allPosts.map((post) => {
                                        return <div key={post._id} className="dash-post">
                                            <Link to={"/post/" + post._id} >
                                                {post.title}
                                            </Link>
                                            <button onClick={deletePost} className="fas fa-trash-alt" id={post._id}></button>
                                        </div>
                                    }
                                    )
                            }


                        </ul>

                    </>
            }
        </div>
    )
}
