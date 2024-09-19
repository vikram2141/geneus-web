import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/g.png";
import { userInfo } from "../../redux/slices/userDetails";
import {
    set,
    selectCount,
    decrement,
    reset,
} from "../../redux/slices/cartCount";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart, removeFromCart } from "./removeFromCart";
import { backendUrl, RAZORPAY_ID } from "../../config";
import { razorpayScript } from "../../config";
import { toast } from "react-toastify";

const Cart = () => {
    const [cartDetails, setCartDetails] = useState({});
    const [isAvailable, setIsAvailable] = useState(false);
    const [count, setcount] = useState(useSelector(selectCount));
    const user = useSelector(userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginInfo = user.isLoggedIn;
    const user_id = user.userId;
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = `${razorpayScript}`;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };
    const makePayment = async (amount) => {
        const res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        let data = JSON.stringify({
            amount: amount.toString(),
            currecy: "INR",
        });
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${backendUrl}/razorpay`,
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                var options = {
                    key: RAZORPAY_ID,
                    name: "Geneus Solutions",
                    currency: "INR",
                    amount: response.data.amount,
                    order_id: response.data.id,
                    description: "Happy Learning",
                    image: Logo,
                    handler: async function (response) {
                        const data = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            user_id: user.userId,
                            cart_details: cartDetails.cart_items,
                        };
                        const verify = await axios.post(
                            `${backendUrl}/paymentverification`,
                            {
                                data: data,
                            }
                        );
                        if (verify.data.success === true) {
                            toast.success("Payment Successfull");
                            emptyCart(cartDetails._id);
                            setcount(0);
                            dispatch(reset());
                            navigate("/");
                        } else {
                            toast.error("Payment Failed");
                        }
                    },
                    prefill: {
                        name: user.username,
                        email: user.useremail,
                    },
                };
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const fetchCartDetails = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}/cart?user_id=${user_id}`
            );

            const data = await response.data;
            console.log(data);
            setCartDetails(data);
            setIsAvailable(true);
            setcount(data.cart_items.length);
        } catch (error) {
            console.error("Failed to fetch course data:", error);
        }
    };
    useEffect(() => {
        if (loginInfo) {
            fetchCartDetails();
        }
    }, [count]);

    return (
        <MDBContainer>
            <hr className="hr" />

            <MDBRow>
                <MDBCol md="12">
                    <div className="text-start fs-1 fw-bold">Shopping Cart</div>
                    {!isAvailable ? (
                        <div></div>
                    ) : (
                        <div className="fst-normal fs-6 mt-2 ml-2">
                            <h6>{count} Courses</h6>
                        </div>
                    )}
                </MDBCol>
            </MDBRow>

            <hr className="hr" />
            <MDBRow>
                <MDBCol md="9">
                    {!isAvailable ? (
                        <MDBRow>
                            <MDBCol md="12">
                                <div className="card">
                                    <div className="card-body text-center">
                                        <MDBIcon
                                            fas
                                            icon="shopping-cart"
                                            color="black"
                                            size="6x"
                                        />
                                        <h5 className="card-title">
                                            0 courses
                                        </h5>
                                        <p className="card-text center">
                                            Your cart is empty. Keep shopping to
                                            find a course!
                                        </p>
                                        <Link to="/courses">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                Keep shopping
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    ) : (
                        <MDBRow>
                            {cartDetails &&
                                cartDetails?.cart_items.map((cart_item) => (
                                    <div className="d-flex flex-start mt-2">
                                        <MDBCol md="3">
                                            <img
                                                fluid
                                                className="shadow-1-strong me-3"
                                                src={cart_item.course_image}
                                                alt="avatar"
                                                width="100%"
                                                height="120"
                                            />
                                        </MDBCol>
                                        <MDBCol md="5">
                                            <div className="ml-2 mt-2 mb-2">
                                                <h5 class="fw-bold mb-0">
                                                    {cart_item.course_title}
                                                </h5>
                                                <div class="d-flex align-items-center mb-3"></div>
                                                <p class="mb-0">
                                                    {
                                                        cart_item.course_description
                                                    }
                                                </p>
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="2">
                                            <div className="ml-1 mt-2 text-end fs-6">
                                                <button
                                                    onClick={() => {
                                                        removeFromCart(
                                                            cartDetails._id,
                                                            cart_item._id
                                                        );
                                                        setcount(count - 1);
                                                        dispatch(decrement());
                                                    }}
                                                    type="button"
                                                    class="btn btn-tertiary"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    Remove
                                                </button>
                                                <br />
                                                <button
                                                    type="button"
                                                    class="btn btn-tertiary"
                                                    data-mdb-ripple-color="light"
                                                >
                                                    move to wishlist
                                                </button>
                                                <br />
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="2">
                                            <div className="ml-1 mt-2">
                                                <div className="mb-1">
                                                    <strong className="text-danger fs-5">
                                                        &#8377;
                                                        {
                                                            cart_item.course_discountPrice
                                                        }
                                                    </strong>
                                                    <h6 className="mb-1">
                                                        <s>
                                                            &#8377;
                                                            {
                                                                cart_item.course_price
                                                            }
                                                        </s>
                                                    </h6>
                                                </div>
                                            </div>
                                        </MDBCol>
                                    </div>
                                ))}
                        </MDBRow>
                    )}
                </MDBCol>

                {!isAvailable ? (
                    <div></div>
                ) : (
                    <MDBCol md="3">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle className="text-start fs-6 fw-normal text-muted">
                                    total:
                                </MDBCardTitle>
                                <MDBCardText>
                                    <div className="mb-1">
                                        <strong className="text-danger fs-4">
                                            &#8377;
                                            {cartDetails &&
                                                cartDetails?.discount}
                                        </strong>
                                        <h6 className="fs-6">
                                            <s>
                                                &#8377;
                                                {cartDetails &&
                                                    cartDetails?.cart_total}
                                            </s>
                                        </h6>
                                        <h6 className="fs-6">
                                            {cartDetails &&
                                                cartDetails?.total_after_discount}{" "}
                                            off
                                        </h6>
                                    </div>
                                </MDBCardText>
                                <MDBBtn
                                    onClick={() =>
                                        makePayment(
                                            cartDetails && cartDetails?.discount
                                        )
                                    }
                                    className="text-center btn-block"
                                    size="lg"
                                    style={{ backgroundColor: "#333333" }}
                                >
                                    {" "}
                                    CHECKOUT{" "}
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )}
            </MDBRow>

            <hr className="hr" />

            <MDBRow>
                <MDBCol md="12">
                    <div className="text-start fs-3 fw-bold">
                        You might also like
                    </div>
                    <div className="fst-normal fs-6 mt-2 ml-2">
                        <h6>Carousal of Courses</h6>
                    </div>
                </MDBCol>
            </MDBRow>

            <hr className="hr" />
        </MDBContainer>
    );
};

export default Cart;
