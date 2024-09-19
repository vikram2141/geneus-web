import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/cartCount";
import userReducer from "./slices/userDetails";
import paymentStatusReducer from "./slices/paymentStatus";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    paymentStatus: paymentStatusReducer,
  },
});
