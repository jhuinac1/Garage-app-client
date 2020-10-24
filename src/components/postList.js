import React from "react";
import axios from "axios";


class PostList extends React.Component {
    state = {
        posts: []
    }
    componentDidMount() {
        this.getPosts();
    }
    getPosts() {
        axios.get("https://fp-garage-api.herokuapp.com/posts").then((response) => {
            this.setState({
                posts: response.data,
            })
        }
        )
    }

    render() {
        return (<>
            <p>Testing Hello world swith 1</p>
            <ul>
                {this.state.posts.map((post) => {
                    return <li key={post._id}> {post.title} <br /> {post.description}</li>
                }
                )}
            </ul>

        </>
        )
    }
};

export default PostList;