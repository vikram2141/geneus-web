import express from "express";
import Cart from "../models/cart";
import User from "../models/user";

const router = express.Router();

router.post("/addtocart", async (req, res) => {
    try {
        const user_id = req.body.userId;
        const ItemData = req.body.ItemData;
        console.log(user_id);

        if (!req.body.userId) {
            return res.status(401).send({ message: "user id is unknown" });
        }
        if (!ItemData)
            return res
                .status(401)
                .send({ message: "item details not present" });

        const user = await User.findById(user_id);
        console.log(user);
        const result = user.courses.findIndex(
            (name) => name.toString() === ItemData.course_id.toString()
        );
        console.log(result);
        if (result != -1) {
            return res
                .status(200)
                .json({ message: "Course already purchased" });
        }
        const cart = await Cart.findOne({ user_id: user_id });
        console.log(cart);
        if (cart) {
            console.log(cart);
            if (cart.cart_items.length == 0) {
                cart.cart_items.push(ItemData);
            } else {
                const isItemAlreadyInCart = cart.cart_items.some(
                    (cart_item) => {
                        console.log(
                            "Comparing:",
                            cart_item.course_id,
                            ItemData.course_id
                        );
                        return (
                            cart_item.course_id.toString() ===
                            ItemData.course_id.toString()
                        );
                    }
                );
                console.log(isItemAlreadyInCart);

                if (isItemAlreadyInCart) {
                    return res
                        .status(200)
                        .json({ message: "Course already in cart" });
                } else {
                    cart.cart_items.push(ItemData);
                }
            }
            let total = 0;
            let dis = 0;
            cart.cart_items.map((cart_item) => {
                total += cart_item.course_price;
                dis += cart_item.course_discountPrice;
            });
            cart.cart_total = total;
            cart.discount = dis;
            cart.total_after_discount = cart.cart_total - cart.discount;

            await cart.save();
            return res.status(200).json({ message: "Course added to cart" });
        } else {
            const newcart = new Cart({
                user_id: user_id,
                cart_items: [],
                cart_total: 0,
                discount: 0,
                total_after_discount: 0,
            });
            newcart.cart_items.push(ItemData);
            newcart.cart_total = ItemData.course_price;
            newcart.discount = ItemData.course_discountPrice;
            newcart.total_after_discount =
                newcart.cart_total - newcart.discount;
            console.log(newcart);
            await newcart.save();
            console.log("cartcreated");
            return res.status(200).json({ message: "Course added to cart" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

router.get("/cart", async (req, res) => {
    try {
        const user_id = req.query.user_id;
        // console.log(user_id);
        let cartItem = await Cart.findOne({ user_id: user_id }).exec();

        if (!cartItem) {
            return res.status(404).json({ error: "Cart details not found" });
        }
        return res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart items" });
    }
});
router.post("/cartempty", async (req, res) => {
    try {
        const user_id = req.query.cart_id;
        const cart = await Cart.findOne({ _id: user_id });
        cart.cart_items = [];
        cart.cart_total = 0;
        cart.discount = 0;
        cart.total_after_discount = 0;
        await cart.save();
        return res.status(200).json({ cartItems: cart });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});
router.post("/cartdelete", async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const course_id = req.query.course_id;

        if (!user_id || !course_id) {
            return res
                .status(400)
                .json({ message: "Both user_id and course_id are required." });
        }

        const cart = await Cart.findOne({ _id: user_id }).exec();

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const cartItemIndex = cart.cart_items.findIndex(
            (cart_item) => cart_item._id.toString() === course_id
        );

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: "Cart item not found." });
        }

        cart.cart_items.splice(cartItemIndex, 1);

        let total = 0;
        let discount = 0;
        cart.cart_items.forEach((cart_item) => {
            total += cart_item.course_price;
            discount += cart_item.course_discountPrice;
        });

        cart.cart_total = total;
        cart.discount = discount;
        cart.total_after_discount = cart.cart_total - cart.discount;

        await cart.save();

        return res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({
            message: "Error deleting cart item",
            error: error.message,
        });
    }
});

export default router;
