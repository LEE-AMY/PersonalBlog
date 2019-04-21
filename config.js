var fs = require("fs");

var globalConfig = {};

var conf = fs.readFileSync( __dirname + "/server.conf");

var configArr = conf.toString().split("\r\n");

configArr.forEach( item => {
    if(item){
        var tmp = item.split("=");
        tmp[0] && tmp[1] && (globalConfig[tmp[0]] = tmp[1]);
    }
    
})


module.exports = globalConfig;