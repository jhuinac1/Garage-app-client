import React from "react";
import axios from "axios";


class PostList extends React.Component {
    state = {
        posts: []
    }
    componentDidMount() {
        this.getPosts();
        // this.getLocation(94901);
    }
    getLocation(zipcode) {
        const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        console.log(API_KEY);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&region=US&key=${API_KEY}`).then(
            (response) => {
                console.log(response.data)
            }
        )
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