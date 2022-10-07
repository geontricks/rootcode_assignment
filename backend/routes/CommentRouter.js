const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.post('/new-comment',async (req,res)=>{
    try {
        var post = await Post.findOne({ _id: req.body.id });
        post.comments.push(req.body.comment);
        await post.save()
        res.status(200).send({
            status:"Successfully Inserted!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send();
   }
})

module.exports = router;