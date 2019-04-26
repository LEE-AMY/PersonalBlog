var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
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
        this.tags = [];
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then( resp => {
            var tmp = []
            resp.data.data.forEach( (item, index) => {
                tmp.push({text: item.tag, link: "/?tag=" + item.tag})
            })
            this.tags = tmp;
        }).catch( err => {
            console.log(err);
        })
    }
});


var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: []
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then( resp => {
            // console.log(resp)
            var tmp = [];
            resp.data.data.forEach( item => {
                var obj = {};
                obj.title = item.title;
                obj.link = "/blog_detail.html?bid=" + item.id;
                tmp.push(obj);
            })
            this.titleList = tmp;
        }).catch( error => {
            console.log( error );
        })
    }
});

var newComments= new Vue({
    el: "#new_comments",
    data: {
        commentList: [
            
        ]
    },
    created: function () {
        this.commentList = [];
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then( resp => {
            var tmp = [];
            resp.data.data.forEach( item => {
                var obj = {};
                obj.name = item.user_name;
                obj.date = item.ctime;
                obj.comment = item.comments;
                tmp.push(obj);
            })
            this.commentList = tmp;
        }).catch( error => {
            console.log(error);
        })
    }
});
