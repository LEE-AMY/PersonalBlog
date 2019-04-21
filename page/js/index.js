var everyDay = new Vue({
    el: '#erver_day',
    data: {
        content: ''
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },

    created: function () {
        axios({
            method: "get",
            url: "/queryEveryDay",

        }).then( resp => {
            this.content = resp.data.data[0].content;
        }).catch( err => {
            console.log(err)
        })
    }
})

var articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 0,
        articleList: [
            {
                title: "PC端微信(2.6.6.28)防撤回", 
                content: "此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...", 
                date: "2019-01-02", 
                views: 100, 
                tags: "homebridge 树莓派", 
                id: 1, 
                link: ""
            }
        ]
    },
    computed: {
        getPage: function() {
            return function (page, pageSize) {
                axios({
                    method: "get",
                    url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,

                }).then(resp => {
                    // console.log(resp)
                    var result = resp.data.data;
                    result.forEach( item => {
                        var tempObj = { };
                        tempObj.title = item.title;
                        tempObj.content = item.content;
                        tempObj.date = item.ctime;
                        tempObj.views = item.views;
                        tempObj.tags = item.tags;
                        tempObj.id = item.id;
                        tempObj.link = "" + item.id;


                        this.articleList.push( tempObj )
                    })
                }).catch(err => {
                    console.log("请求错误")
                })
            }
        }
    },

    created: function() {
        this.getPage( this.page, this.pageSize);
    }
})