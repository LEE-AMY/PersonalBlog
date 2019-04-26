var dbutil = require("./DBUtil.js");

function insertTagBlogMapping( tagId, blogId, ctime, utime, success ) {
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values(?,?,?,?)";

    var params = [tagId, blogId, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    });
    connection.end();
}

function queryByTag( tagId, page, pageSize, success ) {
    var selectSql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";

    var params = [tagId, page * pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSql, params, function (error, result) {
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    });
    connection.end();
}

function queryByTagCount( tagId, success ) {
    var selectSql = "select count(1) as count from tag_blog_mapping where tag_id = ? ";

    var params = [tagId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSql, params, function (error, result) {
        if(error == null) {
            success(result)
        }else {
            console.log(error)
        }
    });
    connection.end();
}


module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;