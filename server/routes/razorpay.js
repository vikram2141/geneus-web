import express from "express";
import shortid from "shortid";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/payment";
import User from "../models/user";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
const router = express.Router();
router.post("/razorpay", async (req, res) => {
    const payment_capture = 1;
    const amount = req.body.amount;
    const currency = req.body.currency;

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture,
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        }).status(200);
    } catch (error) {
        console.log(error);
    }
});

router.post("/paymentverification", async (req, res) => {
    const razorpay_order_id = req.body.data.razorpay_order_id;
    const razorpay_payment_id = req.body.data.razorpay_payment_id;
    const razorpay_signature = req.body.data.razorpay_signature;
    const user_id = req.body.data.user_id;
    const cart_details = req.body.data.cart_details;

    console.log(razorpay_order_id, razorpay_payment_id);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    console.log(isAuthentic);
    if (isAuthentic) {
        try {
            await Payment.create({
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id,
                signature: razorpay_signature,
                status: "success",
                user_id: user_id,
                cart_details: cart_details,
            });
            const user = await User.findById(user_id);
            console.log(user);
            cart_details.forEach((item) => {
                user.courses.push(item.course_id);
            });
            await user.save();
            console.log(user.courses);
            res.status(200).json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: error });
        }
    } else {
        console.log("error");
        res.status(500).json({ success: false });
    }
});

export default router;
