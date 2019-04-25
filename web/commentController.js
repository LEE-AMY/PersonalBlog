var blogDao = require("../dao/BlogDao.js");
var tagsDao = require("../dao/tagsDao.js");
var commentDao = require("../dao/commentDao.js");

var tagBlogMappingDao = require("../dao/tagBlogMappingDao.js");
var timeUtil = require("../util/TimeUtil.js");
var respUtil = require("../util/RespUtil.js");

var captcha = require("svg-captcha"); //验证码

var url = require("url");

var path = new Map();

function addComment( request, response ) {
    var params = url.parse( request.url, true).query;
    commentDao.insertComment( parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    })
}

function queryRandomCode( request, response ) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    // console.log(img)
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "验证码请求成功", img));
    response.end();
}

function queryCommentsByBlogId( request, response ) {
    var params = url.parse( request.url, true).query;
    commentDao.queryCommentsByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询评论成功", result));
        response.end();
    })
}

function queryCommentsCountByBlogId( request, response ) {
    var params = url.parse( request.url, true).query;
    commentDao.queryCommentsCountByBlogId(params.bid, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/addComment", addComment);
path.set("/queryRandomCode", queryRandomCode);
path.set("/queryCommentsByBlogId", queryCommentsByBlogId)
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId)
module.exports.path = path;