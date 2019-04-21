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

var server = app.listen(globalConfig.port, function () {
    console.log("服务器已启动" + globalConfig.port);

    var host = server.address().address
    var port = server.address().port
 
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
