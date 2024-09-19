import express from "express";
import {
    glogin,
    signup,
    login,
    contact,
    logout,
    intrested,
    gsignup,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/intrested", intrested);
router.post("/login", login);
router.post("/contact", contact);
router.post("/logout", logout);
router.post("/glogin", glogin);
router.post("/gsignup", gsignup);

export default router;
