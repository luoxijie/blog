<template>
    <div id="blog">
        <el-container>
            <el-header>
                <H :activeIndex="activeIndex"></H>
            </el-header>
            <el-main>
                <div class="detail">
                    <div class="name">{{ blog[0].blogname }}</div>
                    <div class="typeword">
                        <div
                            class="type"
                            v-for="item in blog[0].typesword"
                            :key="item[0].id"
                            @click="to_type(item[0].id)"
                        >
                            {{ item[0].typename }}
                        </div>
                    </div>
                    <div class="text">{{ blog[0].blogtext }}</div>
                    <div class="other">
                        <div class="likes">
                            <i class="el-icon-star-off" v-show="like == 0" @click="likeblog()">
                                {{ blog[0].likes }}
                            </i>
                            <i class="el-icon-star-on" v-show="like != 0" @click="likeblog()">
                                {{ blog[0].likes }}
                            </i>
                        </div>
                        <div class="time">{{ blog[0].time | formateTime }}</div>
                    </div>
                    <div class="comment">
                        <div class="comments_title">评论区</div>
                        <div class="input">
                            <el-input v-model="comment" @keyup.enter.native="submit_comment()">
                                <el-button slot="append" class="submit" @click="submit_comment()">
                                    发送
                                </el-button>
                            </el-input>
                        </div>
                        <div class="comments">
                            <div class="yes" v-if="comments.length != 0">
                                <div class="comment_div" v-for="item in comments" :key="item.cid">
                                    <div class="cname">
                                        断手小螃蟹发表于{{ item.time | formateTime }}
                                    </div>
                                    <div class="ctext">{{ item.ctext }}</div>
                                </div>
                            </div>
                            <div class="no" v-else>暂无评论,你可以选择发送一条哦。</div>
                        </div>
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
    name: 'detail',
    components: {
        H,
        F,
    },
    data() {
        return {
            activeIndex: '/home',
            id: 0,
            blog: [
                {
                    blogname: '',
                    blogtext: '',
                    likes: 0,
                    time: '2022 - 1 - 1',
                    types: '',
                    typesword: [],
                },
            ],
            comments: [],
            comment: '',
            like: 0,
        };
    },
    methods: {
        async getBlog() {
            const { data: res } = await this.$http.get('/blog/getblog', {
                params: {
                    id: this.id,
                },
            });
            if (res.code == 0) {
                this.blog = res.data;
                // console.log(this.blog);
            } else {
                this.$message.error(res.msg);
            }
        },
        async getCommentByBlogId() {
            const { data: res } = await this.$http.get('/comment/getCommentByBlogId', {
                params: {
                    blogid: this.id,
                },
            });
            if (res.code == 0) {
                this.comments = res.data;
                // console.log(this.comments);
            } else {
                this.$message.error(res.msg);
            }
        },
        async submit_comment() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            const time = year + '-' + month + '-' + day;
            // console.log(time);
            const { data: res } = await this.$http.get('/comment/addComment', {
                params: {
                    blogid: this.id,
                    text: this.comment,
                    time: time,
                },
            });
            if (res.code == 0) {
                this.$message.success('发送成功');
                this.comment = '';
                this.getCommentByBlogId();
            } else {
                this.$message.error(res.msg);
            }
        },
        likeblog() {
            this.like = this.like ? 0 : 1;
            this.blog[0].likes = this.like ? (this.blog[0].likes += 1) : (this.blog[0].likes -= 1);
        },
        to_type(id) {
            this.$router.push({
                name: 'types',
                query: {
                    typeid: id,
                },
            });
        },
    },
    mounted() {
        if (this.$route.query.blogid != undefined) {
            this.id = this.$route.query.blogid;
            this.getBlog();
            this.getCommentByBlogId();
        }
    },
    async beforeDestroy() {
        // 是否点赞
        if (this.like == 1) {
            // 操作
            const { data: res } = await this.$http.get('/blog/addLike', {
                params: {
                    id: this.id,
                },
            });
            if (res.code == 0) {
                return this.$message.success('点赞成功');
            }
        }
    },
};
</script>

<style scoped>
.detail {
    width: 60%;
    height: auto;
    border-radius: 5px;
    background-color: #545c64;
    box-shadow: 6px 6px 12px black;
    margin: 0px auto;
    display: flex;
    flex-wrap: wrap;
    color: #fff;
}
.name {
    width: 95%;
    height: 80px;
    margin: 0px auto;
    line-height: 80px;
    font-size: 20px;
}
.name:hover {
    color: #ffd04b;
}
.typeword {
    width: 95%;
    height: auto;
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
}
.type {
    width: auto;
    height: 25px;
    text-align: center;
    padding: 2px 4px;
    margin: 2px 4px;
    border-radius: 15px;
    color: #fff;
    border: 1px solid #fff;
}
.type:hover {
    color: #ffd04b;
    border-color: #ffd04b;
}
.text {
    width: 95%;
    height: auto;
    margin: 0px auto;
    padding: 10px 0px;
    border-radius: 5px;
    border: 1px solid #fff;
    border-right-style: none;
    border-left-style: none;
}
.other {
    width: 95%;
    height: auto;
    margin: 10px auto;
    display: flex;
    flex-wrap: wrap;
}
.likes,
.time {
    width: auto;
    height: 25px;
    line-height: 25px;
    margin: 0px 20px 0px 0px;
}
.likes:hover,
.time:hover {
    color: #ffd04b;
}
.comment {
    width: 95%;
    height: auto;
    margin: 10px auto;
    padding: 5px 0px;
    border-top: 1px solid #fff;
}
.comments_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.submit {
    color: #fff;
    background-color: #545c64;
}
.submit:hover {
    color: #ffd04b;
}
.comments {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
}
.yes {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
}
.no {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.comment_div {
    width: 100%;
    height: auto;
    margin: 5px auto;
    padding: 5px 0px;
    border-bottom: 1px solid #fff;
}
.cname {
    width: 100%;
    height: 30px;
    line-height: 30px;
}
.cname:hover {
    color: #ffd04b;
}
.ctext {
    width: 100%;
    height: auto;
    font-size: 14px;
}
</style>
