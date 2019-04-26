/**
 * Created by Blue on 2019/4/17.
 */

var express = require("express");
var globalConfig = require("./config.js");
var loader = require("./loader.js");


var app = new express();

app.use( express.static("./page/") );

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.post("/editBlog", loader.get("/editBlog"));

app.get("/queryEveryDay", loader.get("/queryEveryDay"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));
app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));
app.get("/addComment", loader.get("/addComment"));
app.get("/queryRandomCode", loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));
app.get("/queryCommentsCountByBlogId", loader.get("/queryCommentsCountByBlogId"));
app.get("/queryAllBlog", loader.get("/queryAllBlog"));
app.get("/queryRandomTags", loader.get("/queryRandomTags"));
app.get("/queryHotBlog", loader.get("/queryHotBlog"));
app.get("/queryNewComments", loader.get("/queryNewComments"));
app.get("/queryByTag", loader.get("/queryByTag"));
app.get("/queryByTagCount", loader.get("/queryByTagCount"));

var server = app.listen(globalConfig.port, function () {
    console.log("服务器已启动" + globalConfig.port);

    var host = server.address().address
    var port = server.address().port
 
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
