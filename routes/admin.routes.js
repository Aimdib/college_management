module.exports = (app) => {
    var router = require("express").Router();
    const validateTokenMiddleware = require("../middleware/validateToken");
    const auth = require("../controller/admin.controller");


router.post("/college",validateTokenMiddleware.validateToken, auth.createCollege);
router.post("/contest",validateTokenMiddleware.validateToken, auth.createContest);
router.post("/joinContest",validateTokenMiddleware.validateToken, auth.joinContest);


    app.use("/admin", router);
};