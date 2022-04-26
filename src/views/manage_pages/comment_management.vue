<template>
    <div id="blog_management">
        <el-table :data="comment" style="width: 100%; margin: 20px 0px" stripe border>
            <el-table-column prop="bid" label="博客id" width="80"></el-table-column>
            <el-table-column prop="cid" label="评论id" width="80"></el-table-column>
            <el-table-column prop="ctext" label="评论内容"></el-table-column>
            <el-table-column prop="time" label="发表时间" width="200"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editdialog(scope.row.cid)">Edit</el-button>
                    <el-button size="mini" @click="deletecomment(scope.row.cid)" type="danger">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[1, 3, 5, 7]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
        ></el-pagination>
        <el-dialog title="修改评论信息" :visible.sync="editdialogVisible" width="30%">
            <el-form :model="editform" :rules="editrules" ref="editForm" class="demo-ruleForm">
                <el-form-item label="评论内容" prop="ctext">
                    <el-input v-model="editform.ctext"></el-input>
                </el-form-item>
                <el-form-item label="发表时间" prop="time">
                    <el-input v-model="editform.time" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editblog()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'comment_management',
    data() {
        return {};
    },
    methods: {},
    mounted() {},
    data() {
        return {
            res: [],
            page: 1,
            limit: 5,
            editdialogVisible: false,
            editform: {
                bid: 0,
                cid: 0,
                ctext: '',
                time: '2022-01-01',
            },
            editrules: {
                ctext: [{ required: true, message: '请输入评论内容', trigger: 'blur' }],
            },
        };
    },
    computed: {
        comment() {
            let res = [];
            for (let i = 0; i < this.res.length - 1; i++) {
                res.push(this.res[i]);
            }
            return res;
        },
        total() {
            return this.res[this.res.length - 1].total;
        },
    },
    methods: {
        async searchComments() {
            const { data: res } = await this.$http.get('/comment/getAllComment', {
                params: {
                    page: this.page,
                    limit: this.limit,
                },
            });
            if (res.code == 0) {
                this.res = res.data;
                // console.log(this.res);
            } else {
                this.$message.error(res.msg);
            }
        },
        handleSizeChange(newSize) {
            this.limit = newSize;
            this.searchComments();
        },
        handleCurrentChange(newPage) {
            this.page = newPage;
            this.searchComments();
        },
        async editdialog(id) {
            // console.log(id);
            this.editdialogVisible = true;
            const { data: res } = await this.$http.get('/comment/getComment', {
                params: {
                    cid: id,
                },
            });
            if (res.code == 0) {
                this.editform = res.data[0];
                // console.log(this.editform);
            } else {
                this.$message.error(res.msg);
            }
        },
        //修改
        async editblog() {
            const { data: res } = await this.$http.get('/comment/alterComment', {
                params: {
                    cid: this.editform.cid,
                    text: this.editform.ctext,
                },
            });
            if (res.code == 0) {
                this.$message.success('修改成功');
                this.editdialogVisible = false;
            } else {
                this.$message.error(res.msg);
            }
            this.searchComments();
        },
        async deletecomment(id) {
            const { data: res } = await this.$http.get('/comment/deleteComment', {
                params: {
                    cid: id,
                },
            });
            if (res.code == 0) {
                this.$message.success('删除成功');
            } else {
                this.$message.error(res.msg);
            }
            this.searchComments();
        },
    },
    mounted() {
        this.searchComments();
    },
};
</script>

<style scoped>
.pagination {
    margin: 20px 0px;
}
</style>
