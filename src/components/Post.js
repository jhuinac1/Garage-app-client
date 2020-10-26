import React from "react";
import "../styles/post.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";


class Post extends React.Component {


    render() {
        return (
            <li key={this.props.ids} id={this.props.ids} className="individual-post">
                <Link to={"/post/" + this.props.ids} id={this.props.ids}>
                    <h4>{this.props.title}</h4>
                </Link>
                <br />
                {/* {this.props.description}<br /> <img src={this.props.images[0]} alt=""></img> */}
            </li>
        )
    }
}

export default Post;