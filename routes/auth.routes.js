module.exports = (app) => {
    var router = require("express").Router();
    const auth = require("../controller/auth.controller");


router.post("/login", auth.login);
router.post("/signup", auth.signup);
router.post("/logout", auth.logout);



    app.use("/auth", router);
};