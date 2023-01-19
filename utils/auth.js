const jwt = require("jsonwebtoken");
const config = require('../config/dev.json')


const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "A token is required for authentication" });
    }
    if (!req.headers["rolecode"]) {
        return res.status(401).send({ message: "Authentication failed!" });
    }
    if (!req.headers["userid"]) {
        return res.status(401).send({ message: "Authentication failed!" });
    }
    try {
        const decoded = jwt.verify(token, config.secretKey);
        req.headers.access_token = decoded;
    } catch (err) {
        return res.status(401).send({ message: "User Authentication Failed!" });
    }
    return next();
};

module.exports = verifyToken;