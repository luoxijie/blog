<template>
    <div id="home">
        <el-container class="container">
            <el-header>
                <H :activeIndex="activeIndex"></H>
            </el-header>
            <el-main class="main">
                <M v-if="change == 0"></M>
                <T v-else></T>
                <div :class="{ change: true, pst: index == 0 }">
                    <el-button
                        type="info"
                        icon="el-icon-sort"
                        circle
                        @click="changediv()"
                    ></el-button>
                </div>
                <div class="home_blog">
                    <div
                        class="blog"
                        @click="to_detail(item.id)"
                        v-for="(item, index) in blogs"
                        :key="item.id"
                    >
                        <div class="blog_title">{{ index + 1 }}.{{ item.blogname }}</div>
                        <div class="blog_text">{{ item.blogtext }}</div>
                        <div class="blog_types">
                            <div class="types">
                                <div
                                    v-for="item1 in item.typesword"
                                    :key="item1[0].id"
                                    @click="search(item1[0].id)"
                                >
                                    {{ item1[0].typename }}
                                </div>
                            </div>

                            <div class="likes">
                                <i class="el-icon-star-off"></i>
                                {{ item.likes }}
                            </div>
                            <div class="time">{{ item.time | formateTime }}</div>
                        </div>
                    </div>
                    <div class="more">
                        <p @click="search(1)">
                            更多
                            <i class="el-icon-d-arrow-right"></i>
                        </p>
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
import M from '../components/master.vue';
import T from '../components/types.vue';
export default {
    name: 'home',
    components: {
        H,
        F,
        M,
        T,
    },
    data() {
        return {
            activeIndex: '/home',
            change: 0,
            index: 1,
            bodyTop: document.documentElement.scrollTop,
            blogs: [],
        };
    },
    computed: {},
    methods: {
        changediv() {
            if (this.change == 0) {
                this.change = 1;
            } else {
                this.change = 0;
            }
        },
        async getBlogs() {
            const { data: res } = await this.$http.get('/blog/getFirstPageBlogs');
            if (res.code == 0) {
                // console.log(res);
                this.blogs = res.data;
            }
        },
        search(id) {
            this.$router.push({
                name: 'types',
                query: {
                    typeid: id,
                },
            });
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
    mounted() {
        this.getBlogs();
        var btn = document.getElementsByClassName('change');
        window.onscroll = function () {
            var bodyTop = document.documentElement.scrollTop;
            if (bodyTop >= 60 && this.index != 0) {
                this.index = 0;
            } else {
                this.index = 1;
            }
        };
    },
};
</script>

<style scoped>
.container {
    width: 100%;
}
.main {
    height: 950px;
}
.change {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 180px;
    left: 1440px;
}
.pst {
    position: fixed;
    top: 80px;
}
.change button {
    background-color: #545c64;
}
.change:hover button {
    color: #ffd04b;
}
.home_blog {
    /* border: 1px solid red; */
    width: 58%;
    height: auto;
    margin: 0px auto;
    border-radius: 5px;
    background-color: #545c64;
    box-shadow: 6px 6px 12px black;
    position: relative;
    top: 90px;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px 0px;
    opacity: 0.5;
    color: #fff;
}
.blog_types {
    width: 95%;
    height: 20px;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.blog_types .types {
    width: 50%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
.types div {
    width: auto;
    height: 20px;
    line-height: 15px;
    text-align: center;
    padding: 0px 3px;
    margin: 0px 3px;
    border-radius: 10px;
    border: 1px solid #fff;
}
.types div:hover {
    color: #ffd04b;
    border-color: #ffd04b;
}
.likes:hover,
.time:hover {
    color: #ffd04b;
}
.more {
    width: 95%;
    height: 30px;
    line-height: 30px;
    margin: 10px 0px;
    text-align: center;
    color: #fff;
}
.more:hover {
    color: #ffd04b;
}
</style>
