var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: ['python', '指针', 'C语言', 'python', '指针', 'C语言', 'python', '指针', 'C语言', 'python', '指针', 'C语言', 'python', '指针', 'C语言', 'python', '指针', 'C语言']
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() *255;
                var green = Math.random() *255;
                var blue = Math.random() *255;
                return `rgb(${red},${green},${blue})`
            }
        },

        randomSize: function () {
            return function () {
                var size = (Math.random() * 20 + 12) + "px"
                return size;
            }
        }
    },
    created: function() {

    }
});


var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"},
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"},
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"},
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"},
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"},
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"},
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"},
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"},
            {title: "查看你的AWS服务器已使用流量", link: "http://www.baidu.com"}
        ]
    }
});

var newComments= new Vue({
    el: "#new_comments",
    data: {
        commentList: [
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"},
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"},
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"},
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"},
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"},
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"},
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"},
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"},
            {name: "杰西", date: "2018-10-10", comment: "站长可以加个友链么，我新站，刚出来没"}
        ]
    }
});
