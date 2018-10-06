const express = require("express");
const scraper = require("./scraper");
const app = express();

const port = process.env.PORT || 3000;


app.get("/", (req, res, next) => {
    scraper.loadPosts().then(posts => {
        res.json({
            status: true,
            count: posts.length,
            posts: posts
        });
    });
});

app.get("/search/:title", (req, res, next) => {
    scraper.searchPost(req.params.title).then(search => {
        res.status(200).json({
            status: true,
            posts: search
        });
    });
});







app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
