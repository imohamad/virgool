const assert = require("chai").assert;

const virgoolData = require("../index");

describe("#get posts", () => {
  it("the output must be a promise", () => {
    assert.typeOf(virgoolData.getPosts(), "promise");
  });
});

describe("#get profile", () => {
  it("the output must be a promise", () => {
    assert.typeOf(virgoolData.getProfile("imohamad"), "promise");
  });
});