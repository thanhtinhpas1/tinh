var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
    res.render("", {title: "single-post", layout:'login'});
});

module.exports = router;