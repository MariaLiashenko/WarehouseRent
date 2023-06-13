import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

const JWT = "8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI=";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid"));
        }
        req.user = user;
        console.log(req.user);

        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyUserExist = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id) {
            console.log("user exist");
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    console.log("abut");
    verifyToken(req, res, () => {
        console.log("req.user.isAdmin" + req.user.isAdmin);

        if (req.user.isAdmin) {
            console.log("req.user.isAdmin" + req.user.isAdmin);
            next();
        } else {
            return next(createError(403, "You are not auth"));
        }
    });
};
