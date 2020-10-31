import React from "react";
import axios from "axios";
import "../styles/allPosts.css";
//importing components
import Post from "./Post";


class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            city: "",
            state: "",
            zipcode: ""
        }
        this.getLocation = this.getLocation.bind(this)
        this.setZipcode = this.setZipcode.bind(this)
    }
    componentDidMount() {
        // this.getAllPosts();
        // this.getLocation(94901);
    }
    setZipcode(event) {
        try {
            // console.log(event.target.id);
            this.setState({
                [event.target.id]: event.target.value
            })
        } catch (error) {
            console.log(error);
        }
    }
    getLocation(event) {
        event.preventDefault();
        event.target.reset();

        if (this.state.zipcode.length === 5) {
            const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.zipcode}&region=US&key=${API_KEY}`).then(
                (response) => {
                    console.log(response.data.results[0])
                    const cityInfo = response.data.results[0];
                    const nCity = cityInfo.address_components[1].long_name;
                    this.getAllPosts(nCity);
                    this.setState({
                        city: nCity,
                        formatted_address: cityInfo.formatted_address,
                    })
                }
            ).catch((error) => {
                console.log(error);
            }
            )
        } else {
            alert("Enter 5 digits for zipcode");
        }
    }
    getAllPosts(cityName) {
        axios.get("http://localhost:3001/posts/byName/" + cityName).then((response) => {
            this.setState({
                posts: response.data,
            })
        }
        )
    }

    render() {
        return (<div className="main-container">
            <div className="form-container">
                <form onSubmit={this.getLocation}>
                    <label htmlFor="zipcode" className="form-label">Look up a list of posts by zipcode </label>
                    <input type="number" onChange={this.setZipcode} name="zipcode" id="zipcode" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div className="city-name">
                {(this.state.city === "") ? <p></p> : <>
                    <h2>Garage sale items in</h2>
                    <h2>{this.state.formatted_address}
                    </h2>
                    {/* <h2>{this.state.city}</h2> */}
                </>}
            </div>
            <ul className="list-of-all-posts">
                {this.state.posts.map((post) => {
                    return <Post
                        key={post._id}
                        ids={post._id}
                        title={post.title}
                        description={post.description}
                        images={post.pictures}
                    />
                }
                )}
            </ul>

        </div>
        )
    }
};

export default PostList;




//CODE FROM KENG TO FIX HIS AXIOS CALL TO GET A TOKEN
  // try {
        //     axios.post(
        //         'https://test.api.amadeus.com/v1/security/oauth2/token',
        //         {
        //             "params": {
        //                 "grant_type": "client_credentials",
        //                 "client_id": "17SwpRX4PiUUmAv1G6fTC5YGcpLfOAJ4",
        //                 "client_secret": "TmjDpWLqBjzMB8KL"
        //             }
        //         },
        //         {
        //             "headers": {
        //                 "Content-Type": "application/x-www-form-urlencoded",
        //                 // "Access-Control-Allow-Origin": "*"
        //             },
        //         }
        //     ).then((response) => {
        //         console.log(response);
        //     },
        //         (error) => {
        //             console.log(error);
        //         }
        //     ).catch((err) => {
        //         console.log(err);
        //     })

        // } catch (error) {
        //     console.log(error);
        // }