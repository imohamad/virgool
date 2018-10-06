const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = "https://virgool.io";
const searchUrl = "https://virgool.io/search?q=";

function getPosts() {
  return fetch(url)
    .then(response => response.text())
    .then(body => {
      const posts = [];
      const $ = cheerio.load(body);
      $(".card-post").each((i, element) => {
        const author = $(element).find(".meta--author a").text();
        const account = $(element).find(".meta--author a").attr("href").slice(19);
        const avatar = $(element).find(".meta--avatar a img").attr("src");
        const read = $(element).find(".meta--author .meta--time").text().split("-");
        const title = $(element).find("h2.post--title").text();
        const link = $(element).find(".post-content a").attr("href");
        const category = $(element).find("a.post-meta-topic").text();
        const categoryLink = $(element).find("a.post-meta-topic").attr("href");
        const slug = $(element).find(".post--text").text().slice(4, -1);
        const cover = $(element).find("figure.post--cover img").attr("src");
        const like = $(element).find(".btn-action a.iconLabel").text().slice(1, -1);
     
        posts.push({
          author: author,
          account: account,
          avatar: avatar,
          read: read[1].slice(1, -1),
          time: read[0].slice(1, -1),
          title: title,
          link: link,
          category: category,
          categoryLink: categoryLink,
          slug: slug,
          cover: cover,
          like: like
        });
      });

      return posts;
    });
}


function getProfile(username){
  return fetch(`${url}/@${username}`)
  .then(response => response.text())
  .then(body => {
    const user = [];
    const $ = cheerio.load(body);
    const profile = $(".profile-author-module");
    const name = profile.find("a.module--name").text().slice(1, -1);
    const username = profile.find("a.module--name").attr("href").slice(19);
    const avatar = profile.find(".module--avatar a img").attr("src");
    const bio = profile.find("p.module--bio").text();
    

    user.push({
      name: name,
      username: username,
      avatar: avatar,
      bio: bio
    });
    return user;
  });
}





function searchPost(title) {
    return fetch(`${searchUrl}${title}`)
      .then(response => response.text())
      .then(body => {
        const searchResult = [];
        const $ = cheerio.load(body);
        $(".gs-result").each((i, element) => {
            const $element = $(element);
            const $title = $element.find("a.gs-title");
            const $slug = $element.find(".gs-snippet");

            const search = {
                title: $title.text(),
                
    
            };
            searchResult.push(search);
            
        });

        return searchResult;
      });
     
  }

module.exports = {
    getPosts,
    searchPost,
    getProfile
};
