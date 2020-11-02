import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import { noImageUrl } from "./Misc/NoImageUrl";


const PostPage = (props) => {


    const [post, setPost] = useState({});

    useEffect(() => {
        // setPost(props.match.params.id);
        let postId = props.match.params.id;
        axios.get("http://localhost:3001/posts/" + postId).then(
            (response) => {
                console.log(response.data);
                setPost(response.data);
            }
        )
    }, []);

    return (<div className="post-page main-container">
        <div className="information-container">
            <h1 >{post.title}</h1>
            <p>In {post.city}</p>
            {(post.price <= 0) ? <h5>Free!</h5> :
                <h5>${post.price}</h5>
            }
            <h4>{post.description}</h4>
            <h6>Contact Information: {post.contactInfo}</h6>

        </div>
        <div className="images-container">
            {(post.pictures === undefined || post.pictures.length < 1) ?
                <img src={noImageUrl} /> :
                post.pictures.map((picture) => {
                    return <img src={picture} key={picture} alt="no-pic" />
                }
                )}

        </div>

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