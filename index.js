/**
 * Created by YHDN on 2019/4/17.
 */

var express = require("express");

var app = new express();

app.use(express.static("./page/"));

app.listen(12306, function () {
    console.log("服务器已启动")
});