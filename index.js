const express = require("express");
const scraper = require("./scraper");
const app = express();

const port = process.env.PORT || 3000;


app.get("/", (req, res, next) => {
    scraper.getPosts().then(posts => {
        res.json({
            status: true,
            count: posts.length,
            posts: posts
        });
    });
});

app.get("/user/:username", (req, res, next) => {
    scraper.getProfile(req.params.username).then(user => {
        res.status(200).json({
            status: true,
            user: user
        });
    });
});







app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
