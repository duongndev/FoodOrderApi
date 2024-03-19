const router = require("express").Router();

router.post("/payment", (req, res) => {
    res.send("Payment Route");
});

module.exports = router;