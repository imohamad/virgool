const fetch = require("node-fetch");
const cheerio = require("cheerio");

const URL = "https://virgool.io";

function getPosts() {
  return fetch(URL)
    .then(response => response.text())
    .then(body => {
      const posts = [];
      const $ = cheerio.load(body);
      $(".card-post").each((index, element) => {
        const author = $(element)
          .find(".meta--author a")
          .text();
        const username = $(element)
          .find(".meta--author a")
          .attr("href")
          .slice(19);
        const avatar = $(element)
          .find(".meta--avatar a img")
          .attr("src");
        const reading = $(element)
          .find(".meta--author .meta--time")
          .text()
          .split("-");
        const title = $(element)
          .find("h2.post--title")
          .text();
        const link = $(element)
          .find(".post-content a")
          .attr("href");
        const category = $(element)
          .find("a.post-meta-topic")
          .text();
        const categoryLink = $(element)
          .find("a.post-meta-topic")
          .attr("href");
        const summary = $(element)
          .find(".post--text")
          .text()
          .slice(4, -1);
        const cover = $(element)
          .find("figure.post--cover img")
          .attr("src");
        const like = $(element)
          .find(".btn-action a.iconLabel")
          .first()
          .text()
          .slice(1, -1);
        const comments = $(element)
          .find(".btn-action a.iconLabel")
          .last()
          .text()
          .slice(0, -5);

        posts.push({
          title: title,
          link: link,
          reading: reading[1].slice(1, -1),
          time: reading[0].slice(1, -1),
          category: category,
          categoryLink: categoryLink,
          summary: summary,
          cover: cover,
          like: like,
          comments: comments,
          author: {
            name: author,
            username: username,
            avatar: avatar
          }
        });
      });

      return posts;
    });
}
function getProfile(username) {
  return fetch(`${URL}/@${username}`)
    .then(response => response.text())
    .then(body => {
      const user = [];
      const posts = [];

      const $ = cheerio.load(body);
      const profile = $(".profile-author-module");
      const name = profile
        .find("a.module--name")
        .text()
        .slice(1, -1);
      const username = profile
        .find("a.module--name")
        .attr("href")
        .slice(19);
      const avatar = profile.find(".module--avatar a img").attr("src");
      const bio = profile.find("p.module--bio").text();
      const followers = profile
        .find("a.followers")
        .text()
        .split(" ");
      const following = profile
        .find("a.following")
        .text()
        .split(" ");

      $(".card-post").each((index, element) => {
        const reading = $(element)
          .find(".meta--author .meta--time")
          .text()
          .split("-");
        const title = $(element)
          .find("h2.post--title")
          .text();
        const link = $(element)
          .find(".post-content a")
          .attr("href");
        const category = $(element)
          .find("a.post-meta-topic")
          .text();
        const categoryLink = $(element)
          .find("a.post-meta-topic")
          .attr("href");
        const summary = $(element)
          .find(".post--text")
          .text()
          .slice(4, -1);
        const cover = $(element)
          .find("figure.post--cover img")
          .attr("src");
        const like = $(element)
          .find(".btn-action a.iconLabel")
          .first()
          .text()
          .slice(1, -1);
        const comments = $(element)
          .find(".btn-action a.iconLabel")
          .last()
          .text()
          .slice(0, -5);

        posts.push({
          title: title,
          link: link,
          reading: reading[1].slice(1, -1),
          time: reading[0].slice(1, -1),
          category: category,
          categoryLink: categoryLink,
          summary: summary,
          cover: cover,
          like: like,
          comments: comments
        });
      });

      user.push({
        name: name,
        username: username,
        avatar: avatar,
        bio: bio,
        followers: followers[1],
        following: following[0],
        postCount: posts.length,
        posts: posts
      });
      return user;
    });
}
module.exports = {
  getPosts,
  getProfile
};
