import express from "express";
//import auth from "../middleware/auth.js";
import * as authActions from "../controllers/authentication.js";

const router = express.Router();
router.post("/login", authActions.login);
// router.post("/changePassword", auth, authActions.changePassword);
// router.post("/sendResetLink", authActions.sendResetLink);
// router.post("/resetPassword", authActions.resetPassword);
// router.post("/isTokenValid", authActions.isTokenValid);

export default router;
