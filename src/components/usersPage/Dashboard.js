import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import UserContext from '../../context/userContext';
import axios from "axios";
import Login from "../auth/Login";

export default function Dashboard() {
    const { userData } = useContext(UserContext);
    const [allPosts, setAllPosts] = useState([]);

    const getUserPosts = async () => {
        try {
            const posts = await axios("http://localhost:3001/posts/userPosts/" + userData.user.id);
            console.log(posts.data);
            setAllPosts(posts.data);

        } catch (error) {
            console.log(error.message);
        }
    }

    getUserPosts();



    return (
        <div className="Dashboard-page">
            {
                (!userData.user) ? <Login /> :
                    <>
                        <h2>Hello new user </h2>
                        <Link to="/user/newPost">Create new Post</Link>

                        <ul className="user-all-posts">
                            {
                                (allPosts.length === 0) ? <p>No posts</p> :
                                    allPosts.map((post) => {
                                        return <li className="dash-post">
                                            <Link to={"/post/" + post._id}>
                                                {post.title}
                                            </Link>

                                        </li>
                                    }
                                    )
                            }


                        </ul>

                    </>
            }
        </div>
    )
}
