var express = require('express');
var router = express.Router();
var postdb = require("../models/posts");
var catedb = require("../models/categories");
var tagdb = require("../models/tags");

//middleware
router.use(require("../middlewares/local.mdw"));

router.get("/:cateID", function(req, res) {

    var cateID = parseInt(req.params.cateID);

    var allPostDB = postdb.findAllPost();
         
    allPostDB.then(lstPost => {
        console.log(lstPost.length)
        //Get list post have same category
        var lstPostOfCate = lstPost.filter(item => {
            if(item.category_id == cateID)
                return item;
        })
        console.log(lstPostOfCate);
        res.render("02_archive-page", {
            title:"archieve-post",
            layout: "base-view",
            popularNew: res.locals.lcTopHot.slice(0,3),
            lstPostOfCate: lstPostOfCate.slice(1,lstPostOfCate.length),
            firstPost: lstPostOfCate[0]
        });
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;