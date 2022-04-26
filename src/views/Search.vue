<template>
    <div id="search">
        <el-container>
            <el-header>
                <H :activeIndex="activeIndex"></H>
            </el-header>
            <el-main>
                <div class="search">
                    <div class="input">
                        <div class="input-search">
                            <el-input v-model="kw" @keyup.enter.native="search()">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </div>
                    </div>
                    <div class="blogs" v-if="blogs.length != 0">
                        <div
                            class="blog"
                            @click="to_detail(item.id)"
                            v-for="(item, index) in blogs"
                            :key="item.id"
                        >
                            <div class="blog_title">{{ index + 1 }}.{{ item.blogname }}</div>
                            <div class="blog_text">{{ item.blogtext }}</div>
                            <div class="blog_types">
                                <div class="likes">
                                    <i class="el-icon-star-off"></i>
                                    {{ item.likes }}
                                </div>
                                <div class="time">{{ item.time | formateTime }}</div>
                            </div>
                        </div>
                        <div class="more" @click="get_more()" v-show="more">加载更多</div>
                        <div class="nomore" v-show="!more">没有了</div>
                    </div>
                    <div class="noBlogs" v-else>
                        <p>暂无博客,请重新输入关键词</p>
                    </div>
                </div>
            </el-main>
            <el-footer>
                <F></F>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import H from '../components/head.vue';
import F from '../components/foot.vue';
export default {
    name: 'search',
    components: {
        H,
        F,
    },
    data() {
        return {
            activeIndex: '/search',
            kw: '',
            blogs: [],
            page: 1,
            limit: 4,
            more: true,
        };
    },
    methods: {
        async getSearchBlogs() {
            const { data: res } = await this.$http.get('/blog/getSearchBlogs', {
                params: {
                    kw: this.kw,
                    page: this.page,
                    limit: this.limit,
                },
            });
            return res;
        },
        async search() {
            this.page = 1;
            if (this.kw == '') {
                this.blogs = [];
                return this.$message.warning('关键词为空');
            }
            const res = await this.getSearchBlogs();
            if (res.data.length == 0) {
                this.more = true;
                this.blogs = [];
                return this.$message.warning('没有相关的博客');
            } else {
                this.blogs = res.data;
            }
        },
        async get_more() {
            this.page += 1;
            const res = await this.getSearchBlogs();
            if (res.data.length < this.limit) {
                this.more = false;
            }
            this.blogs = [...this.blogs, ...res.data];
        },
        to_detail(id) {
            this.$router.push({
                name: 'detail',
                query: {
                    blogid: id,
                },
            });
        },
    },
    async mounted() {
        if (this.$route.query.kw != undefined) {
            this.kw = this.$route.query.kw;
            this.$route.query.kw = undefined;
        }
        if (this.kw != '') {
            const res = await this.getSearchBlogs();
            this.blogs = res.data;
        }
    },
};
</script>

<style scoped>
.search {
    width: 60%;
    height: auto;
    border-radius: 5px;
    background-color: #545c64;
    box-shadow: 6px 6px 12px black;
    margin: 0px auto;
    display: flex;
    flex-wrap: wrap;
}
.input {
    width: 70%;
    height: 80px;
    color: #fff;
    position: relative;
    top: 5px;
    margin: 5px auto;
    display: flex;
    flex-wrap: wrap;
}
.input-search {
    width: 100%;
    height: auto;
    margin: 20px auto;
}
.blogs {
    width: 95%;
    height: auto;
    margin: 10px auto;
}
.blog {
    width: 90%;
    height: 150px;
    margin: 10px auto;
    border: 1px solid #fff;
    border-radius: 5px;
    border-left-color: #545c64;
    border-right-color: #545c64;
}
.blog:hover {
    border-top-color: #ffd04b;
    border-bottom-color: #ffd04b;
}
.blog_title {
    width: auto;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    color: #fff;
}
.blog_title:hover {
    color: #ffd04b;
}
.blog_text {
    width: 95%;
    height: 85px;
    margin: 10px 0px;
    opacity: 0.5;
    color: #fff;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
}
.blog_types {
    width: 95%;
    height: 20px;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.likes:hover,
.time:hover {
    color: #ffd04b;
}
.noBlogs {
    text-align: center;
    width: 90%;
    height: 150px;
    margin: 0px auto;
    color: #fff;
    align-items: center;
}
.noBlogs p {
    margin: 45px;
}
.more,
.nomore {
    width: 95%;
    height: 30px;
    margin: 5px auto;
    text-align: center;
    line-height: 30px;
    font-style: oblique;
    color: #fff;
}
.more:hover {
    color: #ffd04b;
}
</style>
