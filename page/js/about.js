var sendComment= new Vue({
    el: "#send_comment",
    data: {
        vcode: '',
        rightCode: ''
    },
    
    computed: {
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then( resp => {
                    this.vcode = resp.data.data.data;
                    this.rightCode = resp.data.data.text.toUpperCase();
                }).catch( err => {
                    console.log(err)
                })
            }
        },

        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value.toUpperCase();
                if( code != this.rightCode ) {
                    alert("验证码有误");
                    this.changeCode()
                    return;
                }

                var bid = -1;

                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                if(!reply || !name || !email || !content) {
                    alert("每一项都是必填项");
                    return;
                }
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
                }).then( resp => {
                    alert( resp.data.msg );
                }).catch( err => {
                    alert( "评论提交失败" );
                })

            }
        }
    },

    created () {
        this.changeCode();
    }
});

var blogComment = new Vue({
    el: "#blog_comment",
    data: {
        total: 100,
        comments: [
            // {id: "1", name: "Allen", ctime:123214421, comments: "sdgagdgsdag", options: ""},
            // {id: "2", name: "Allen", ctime:123214421, comments: "sdgagdgsdag", options: ""},
            // {id: "3", name: "Allen", ctime:123214421, comments: "sdgagdgsdag", options: ""},
            // {id: "4", name: "Allen", ctime:123214421, comments: "sdgagdgsdag", options: ""},
        ]
    },
    computed: {
        reply: function () {
            return function ( commentId, userName ) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                // location.href = "#send_comment";
            }
        }
    },
    created: function () {

        var bid = -1;

        this.comments = [];
        this.total = 0;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then( resp => {
            this.comments = resp.data.data;
            resp.data.data.forEach( (item, index) => {
                if( item.parent > -1 ) {
                    this.comments[index].options = "回复@" + item.parent_name
                }
            })

            console.log(this.comments)
            
        }).catch( err => {
            console.log(err)
        });

        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid=" + bid
        }).then( resp => {
            this.total = resp.data.data[0].count;
        }).catch( error => {
            console.log(error)
        })
    }
})