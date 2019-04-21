var fs = require("fs");
var globalConfig = require("./config.js");

var controllerSet = [];
var pathMap = new Map();

// console.log(__dirname + globalConfig["web_path"])
var files = fs.readdirSync(__dirname + globalConfig["web_path"])

files.forEach( item => {
    var temp = require("." + globalConfig["web_path"] + "/" + item);
    if(temp.path) {
        for( var [key, value] of temp.path) {
            if( pathMap.get(key) == null ) {
                pathMap.set(key, value);
            }else {
                throw new Error("url path异常，url:" + key );
            }

            
        }
        controllerSet.push(temp);
    }
})

// console.log(controllerSet)
// console.log(pathMap)

module.exports = pathMap;