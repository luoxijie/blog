<template>
    <div id="type">
        <el-container>
            <el-header>
                <H :activeIndex="activeIndex"></H>
            </el-header>
            <el-main>
                <div class="type">
                    <div class="tags">
                        <span>tags</span>
                        <div
                            v-for="item in tags"
                            :key="item.id"
                            :class="{ tag: true, activeTag: item.id == typeid }"
                            @click="searchblogs(item.id)"
                        >
                            {{ item.typename }}
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
                    </div>
                    <div class="noBlogs" v-else>
                        <p>暂无此类型的博客,请重新选择类型</p>
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
    name: 'type',
    components: {
        H,
        F,
    },
    data() {
        return {
            activeIndex: '/types',
            blogs: [],
            tags: [],
            typeid: 1,
        };
    },
    methods: {
        async getTypeBlogs() {
            const { data: res } = await this.$http.get('/blog/getDifferentTypeBlogs', {
                params: {
                    typeId: this.typeid,
                },
            });
            if (res.code == 0) {
                this.blogs = res.data;
                // console.log(this.blogs[0]);
            } else {
                this.$message.error(res.msg);
            }
        },
        async getAllTypes() {
            const { data: res } = await this.$http.get('/type/getAllType');
            if (res.code == 0) {
                // console.log(res);
                this.tags = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        searchblogs(id) {
            if (this.typeid == id) {
                return;
            } else {
                this.typeid = id;
                // console.log(id, this.typeid, this.$route.query.typeid);
                this.getTypeBlogs();
            }
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
        if (this.$route.query.typeid != undefined) {
            this.typeid = this.$route.query.typeid;
            this.$route.query.typeid = undefined;
        }
        this.getTypeBlogs();
        this.getAllTypes();
    },
};
</script>

<style scoped>
.type {
    width: 60%;
    height: auto;
    border-radius: 5px;
    background-color: #545c64;
    box-shadow: 6px 6px 12px black;
    margin: 0px auto;
    display: flex;
    flex-wrap: wrap;
}
.tags {
    width: 95%;
    height: auto;
    color: #fff;
    position: relative;
    top: 5px;
    margin: 5px auto;
    display: flex;
    flex-wrap: wrap;
}
.tags span {
    width: auto;
    height: 25px;
    /* line-height: 29px; */
    border: 1px solid #fff;
    background-color: #ffd04b;
    border-radius: 5px;
    padding: 2px 4px;
    margin: 2px 4px;
}
.tag {
    width: auto;
    height: 25px;
    text-align: center;
    padding: 2px 4px;
    margin: 2px 4px;
    border-radius: 15px;
    color: #fff;
    border: 1px solid #fff;
}
.tag:hover {
    color: #ffd04b;
    border-color: #ffd04b;
}
.activeTag {
    border-color: #ffd04b;
    color: #ffd04b;
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
</style>
