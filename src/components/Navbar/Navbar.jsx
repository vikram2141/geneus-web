import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Logo from "../../assets/g.png";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import { MDBBadge } from "mdbreact";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { set, selectCount } from "../../redux/slices/cartCount";
import { userInfo, removeUserDetails } from "../../redux/slices/userDetails";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../config";

axios.defaults.withCredentials = true;

function NavbarComponent({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    const count = useSelector(selectCount);
    const userDetail = useSelector(userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .post(`${backendUrl}/logout`)
            .then((response) => {
                console.log(response.data);
                if (!response.data) {
                    dispatch(removeUserDetails());
                }
                navigate("/login");
                dispatch(set(0));
            })
            .catch((err) => console.log("error: ", err));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img
                            src={Logo}
                            height="60"
                            width="150"
                            alt="Logo"
                            id="img"
                            loading="lazy"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <form
                            className="search-bar"
                            onSubmit={handleSearchSubmit}
                        >
                            <div className="search-box">
                                <MDBIcon
                                    className="search-icon ml-2"
                                    icon="search"
                                />
                                <input
                                    type="text"
                                    placeholder="Search for anything"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <button type="submit">Search</button>
                            </div>
                        </form>

                        <Nav>
                            {userDetail.isLoggedIn ? (
                                <>
                                    <Nav.Link as={Link} to={`/learning`}>
                                        <h4 className="linkText1">
                                            My Learning
                                        </h4>
                                    </Nav.Link>
                                    <Nav.Link className="text-primary fw-bold">
                                        Hello {userDetail.username}
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={handleLogout}
                                        className="logout"
                                    >
                                        <h4 className="linkText">Logout</h4>
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/login"
                                        className="login"
                                    >
                                        <h4 className="linkText1">Log in</h4>
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/signup"
                                        className="signup"
                                    >
                                        <h4 className="linkText2">Sign up</h4>
                                    </Nav.Link>
                                </>
                            )}
                            <Nav.Link as={Link} to="/cart">
                                <h4 className="linkText3">
                                    <MDBIcon icon="shopping-cart" size="x" />
                                    <MDBBadge
                                        color="primary"
                                        className="rounded-pill badge-notification"
                                    >
                                        {count}
                                    </MDBBadge>
                                </h4>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="about_pages">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li className="dropdown">
                        <Link
                            to="#"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            Services
                        </Link>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/course" className="dropdown-item">
                                    Course
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/nutrifit"
                                    className="dropdown-item"
                                >
                                    NutriFit
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/nutritional">Nutritional</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavbarComponent;
