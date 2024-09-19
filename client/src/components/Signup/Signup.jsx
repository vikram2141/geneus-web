import React, { useEffect, useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { backendUrl, gid } from "../../config";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../redux/slices/userDetails";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
   /* const setUserDetails = async (data) => {
        const newUserDetails = {
            isLoggedIn: true,
            username: data.name,
            useremail: data.email,
            userId: data.id,
        };
        dispatch(addUserDetails(newUserDetails));
    };*/

    axios.defaults.withCredentials = true;
   /* async function handleCredentialResponse(response) {
        const decoded = jwtDecode(response.credential);
        const email = decoded.email;
        const name = decoded.name;
        const password = "12345678";
        try {
            const { data } = await axios.post(`${backendUrl}/gsignup`, {
                name,
                email,
                password,
            });
            console.log(data);
            toast.success("Signup successful!");
            navigate("/");
            setUserDetails(data);
        } catch (err) {
            toast.error("Sign up failed");
        }
    }*/
      /* useEffect(() => {
      global google 
        google.accounts.id.initialize({
            client_id: gid,
            callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
            document.getElementById("g_id_onload"),
            {
                type: "standard",
                theme: "filled_blue",
                size: "large",
                shape: "rectangular",
                width: "350",
                innerHeight: "250",
                outerHeight: "350",
                logo_alignment: "left",
            }
        );
        google.accounts.id.prompt();
    }, []);*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/signup`, {
                name,
                email,
                password,
            }).catch(err => {
                console.error(err); // Log the error for debugging
                alert(err.response.data);
            });

            toast.success("Signup Successful, Please login");
            navigate("/");
        } catch (err) {
            toast.error(err.response);
        }
    };

    return (
        <MDBContainer fluid className="box">
            <MDBRow className="d-flex justify-content-center align-items-center h-75">
                <MDBCol col="12">
                    <MDBCard
                        className="bg-white my-4 mx-auto"
                        style={{ borderRadius: "1rem", maxWidth: "450px" }}
                    >
                        <MDBCardBody className="p-4 w-100 d-flex flex-column">
                            <h6 className="fw-bold mb-2 text-center text-dark">
                                Register your Geneus Solutions account
                            </h6>
                            <div
                                id="g_id_onload"
                                className="flex flex-center"
                            ></div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <form onSubmit={handleSubmit}>
                <MDBRow className="d-flex justify-content-center align-items-center h-75">
                    <MDBCol col="12">
                        <MDBCard
                            className="bg-white my-4 mx-auto"
                            style={{ borderRadius: "1rem", maxWidth: "450px" }}
                        >
                            <MDBCardBody className="p-4 w-100 d-flex flex-column">
                                <h6 className="fw-bold mb-4 text-center text-dark">
                                    Sign up and start learning
                                </h6>

                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    onChange={(e) => setName(e.target.value)}
                                    name="name"
                                    label="Full name"
                                    id="name"
                                    type="text"
                                    size="lg"
                                />
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    label="Email"
                                    id="email"
                                    type="email"
                                    size="lg"
                                />
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    name="password"
                                    label="Password"
                                    id="pwd"
                                    type="password"
                                    size="lg"
                                />

                                <div className="d-flex justify-content-between text-dark mb-2 fs-500 fw-lighter">
                                    <MDBCheckbox
                                        name="flexCheck"
                                        value=""
                                        id="flexCheckDefault"
                                        label="Send me special offers, personalized recommendations, and learning tips"
                                    />
                                </div>

                                <MDBBtn
                                    className="mb-2 w-120 fw-bold text-capitalize"
                                    size="lg"
                                >
                                    Sign up
                                </MDBBtn>

                                <hr className="my-3 text-muted" />
                                <p className="text-center text-body">
                                    Already have an account?{" "}
                                    <Link
                                        as={Link}
                                        to="/login"
                                        className="log_in"
                                    >
                                        {" "}
                                        Log in
                                    </Link>
                                </p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </form>
        </MDBContainer>
    );
};

export default Signup;
