var tagsDao = require("../dao/TagsDao.js");
var tagBlogMappingDao = require("../dao/tagBlogMappingDao.js");
var blogDao = require("../dao/BlogDao.js");
var respUtil = require("../util/RespUtil.js");
var url = require("url")

var path = new Map();

function queryRandomTags ( request, response ) {
    tagsDao.queryAllTag( function ( result ) {
        result.sort( function () {
            return Math.random() > 0.5;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "生成成功", result));
        response.end();
    })
}

function queryByTag ( request, response ) {
    var params = url.parse( request.url, true ).query;
    tagsDao.queryTag(params.tag, function (result) {
        // console.log(result[0].id)
        if ( result == null || result.length == 0 ) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", null));
            response.end();
        }else {
            tagBlogMappingDao.queryByTag( result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                var blogList = [];
                result.forEach( item => {
                    blogDao.queryBlogById(item.blog_id, function (blog) {
                        blogList.push(blog[0]);
                    })
                });

                getResult(blogList, result.length, response);
                // console.log(blogList)
            })
        }
        
    });
    
}

function getResult(blogList, len, response) {
    if( blogList.length < len ) {
        setTimeout(() => {
            getResult(blogList, len, response)
        }, 10);
    }else {
        for( var i = 0; i < blogList.length; i++ ) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/g, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,6}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", blogList));
        response.end();
    }
}

function queryByTagCount ( request, response ) {
    var params = url.parse( request.url, true ).query;
    tagsDao.queryTag(params.tag, function (result) {
        if ( result == null || result.length == 0 ) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", null));
            response.end();
        }else {
            tagBlogMappingDao.queryByTagCount( result[0].id, function (result) {
                response.writeHead(200);
                response.write(respUtil.writeResult("success", "查询成功", result));
                response.end();
            })
        }
        
    });
    
}

path.set("/queryRandomTags", queryRandomTags)
path.set("/queryByTag", queryByTag)
path.set("/queryByTagCount", queryByTagCount)
module.exports.path = path