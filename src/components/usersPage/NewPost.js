import React, { useState, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Login from "../auth/Login";
import axios from "axios";


export default function NewPost() {
    const { userData } = useContext(UserContext);
    const history = useHistory();

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    const categoryF = (e) => { setCategory(e.target.value) };
    const titleF = (e) => { setTitle(e.target.value) };
    const priceF = (e) => { setPrice(e.target.value) };
    const descriptionF = (e) => { setDescription(e.target.value) };
    const zipcodeF = (e) => { setZipcode(e.target.value); };
    const contactInfoF = (e) => { setContactInfo(e.target.value); };
    console.log("here");


    const createNewPost = (event) => {
        event.preventDefault();
        // console.log(zipcode);
        if (zipcode.length === 5) {
            const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&region=US&key=${API_KEY}`).then(
                (response) => {
                    const cityInfo = response.data.results[0];
                    const nCity = cityInfo.address_components[1].long_name;
                    console.log(nCity);
                    const createPost = {
                        category: category,
                        title: title,
                        price: price,
                        description: description,
                        city: nCity,
                        contactInfo: contactInfo,
                        uId: userData.user.id
                    }
                    console.log(createPost);
                    axios.post("http://localhost:3001/posts", createPost).then(
                        (res) => {
                            // console.log(res.data)
                            history.push("/user/dashboard");
                        });
                }
            ).catch((error) => {
                console.log(error);
            }
            )
        } else {
            alert("Enter 5 digits for zipcode");
        }
    }

    return (
        <div className="new-post-page">
            {
                (!userData.user) ? <Login /> :
                    <>
                        <h4>NEW POST</h4>
                        <p>{zipcode}</p>

                        <form onSubmit={createNewPost}>
                            <label htmlFor="category">Category</label>
                            <input id="category" type="text" onChange={categoryF} />
                            <label htmlFor="title">Title</label>
                            <input id="title" type="text" onChange={titleF} />
                            <label htmlFor="price">Price</label>
                            <input id="price" type="number" onChange={priceF} />
                            <label htmlFor="description">Description</label>
                            <input id="description" type="text" onChange={descriptionF} />
                            <label htmlFor="zipcode">Zipcode</label>
                            <input id="zipcode" type="number" onChange={zipcodeF} />
                            <label htmlFor="contactInfo">Contact Information</label>
                            <input id="contactInfo" type="text" onChange={contactInfoF} />

                            <input type="submit" value="Create A New Post" />
                        </form>
                    </>
            }
        </div>
    )
}
