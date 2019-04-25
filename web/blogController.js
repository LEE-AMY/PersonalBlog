var blogDao = require("../dao/BlogDao.js");
var tagsDao = require("../dao/tagsDao.js");
var tagBlogMappingDao = require("../dao/tagBlogMappingDao.js");
var timeUtil = require("../util/TimeUtil.js");
var respUtil = require("../util/RespUtil.js");
var url = require("url");

var path = new Map();

function queryBlogByPage ( request, response ) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage( parseInt(params.page), parseInt(params.pageSize), function ( result ) {
        for( var i = 0; i < result.length; i++ ) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/g, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,6}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

function editBlog( request, response ) {
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g,"").replace(/，/g, ",");
    request.on("data", function (data) {
        blogDao.insertBlog( params.title, data.toString(), tags, 0 , timeUtil.getNow(), timeUtil.getNow(), function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();

            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0; i < tagList.length; i++) {
                if(tagList[i] == "") {
                    continue;
                }

                queryTag( tagList[i], blogId)
            }
        })
    })
}

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function(result) {
        if(result == null || result.length == 0) {
            insertTag(tag, blogId)
        } else {
            insertTagBlogMapping(result[0].id, blogId);
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function(result) {
        insertTagBlogMapping(result.insertId, blogId)
    })
}

function insertTagBlogMapping( tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow() ,function (result) {

    })
}

function queryBlogCount( request, response ) {
    blogDao.queryBlogCount( function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

function queryBlogById( request, response ) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById( params.bid, function (result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set("/editBlog", editBlog);
path.set("/queryBlogByPage", queryBlogByPage);
path.set("/queryBlogCount", queryBlogCount);
path.set("/queryBlogById", queryBlogById);

module.exports.path = path;