import axios from "axios";
import React from "react";
import Nav from "./nav";
import { useState, useEffect } from 'react';


const PostPage = (props) => {

    const [post, setPost] = useState({});

    useEffect(() => {
        setPost(props.match.params.id);
        let postId = props.match.params.id;
        axios.get("http://localhost:3001/posts/" + postId).then(
            (response) => {
                console.log(response.data);
                setPost(response.data);
            }
        )
    }, []
    )

    return (<div className="post-page">
        <Nav />
        <h1>Page Test</h1>
        {(post.pictures === undefined) ?
            <p>No Image</p> :
            post.pictures.map((picture) => {
                return <img src={picture} key={picture} alt="picture" />
            }
            )}
        <h4>{post.description}</h4> <br />
        <h4>{post.title}</h4> <br />
        <h4>{post.city}</h4> <br />
        <h4>{post.state}</h4> <br />
        <h5>{post.price}</h5> <br />

    </div>)
}


export default PostPage;





// class PostPage extends React.Component {

//     // post(props) {
//     //     const [post, setPost] = useState({});

//     //     setPost(props.match.params.id);
//     // }
//     render() {

//         return (<div className="post-page">
//             <h1>Post Page</h1>
//             <p>{params.id}</p>

//         </div>)
//     }
// }