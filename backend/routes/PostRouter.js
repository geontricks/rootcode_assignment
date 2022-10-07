const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get('/all',async (req,res)=>{
    var result = await Post.find({});
    res.status(200).send(result);
})

router.post('/new-post', (req, res) => {
    try {
        var post = new Post({
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
            comments:[]
        })

        var re = post.save();
        res.status(200).send({
            status:"Successfully Inserted!"
        });
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
})

module.exports = router;