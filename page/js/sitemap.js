var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    computed: {
        
    },

    created() {
        axios({
            method: "get",
            url: "/queryAllBlog"
        }).then( resp => {
            this.blogList = resp.data.data;
            resp.data.data.forEach( (item, index) => {
                this.blogList[index].link = "/blog_detail.html?bid=" + item.id;
            })
        }).catch( error => {
            console.log(error)
        })
    },
})