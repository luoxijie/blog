<template>
    <div id="blog_management">
        <el-button type="info" @click="adddialog()">add</el-button>
        <div class="types">
            <el-tag class="first">标签</el-tag>
            <el-tag type="info" v-for="item in types" :key="item.id" class="type">
                {{ item.id }}:{{ item.typename }}
            </el-tag>
        </div>
        <el-table :data="blog" style="width: 100%; margin: 20px 0px" stripe border>
            <el-table-column prop="id" label="博客id" width="80"></el-table-column>
            <el-table-column prop="blogname" label="博客名称"></el-table-column>
            <el-table-column prop="blogtext" label="博客内容"></el-table-column>
            <el-table-column prop="types" label="博客标签" width="100"></el-table-column>
            <el-table-column prop="time" label="发表时间" width="200"></el-table-column>
            <el-table-column prop="likes" label="点赞数量" width="80"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editdialog(scope.row.id)">Edit</el-button>
                    <el-button size="mini" @click="deleteblog(scope.row.id)" type="danger">
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
            :total="total.total"
            class="pagination"
        ></el-pagination>
        <el-dialog title="修改博客信息" :visible.sync="editdialogVisible" width="30%">
            <el-form :model="editform" :rules="editrules" ref="editForm" class="demo-ruleForm">
                <el-form-item label="博客名称" prop="blogname">
                    <el-input v-model="editform.blogname"></el-input>
                </el-form-item>
                <el-form-item label="博客内容" prop="blogtext">
                    <el-input v-model="editform.blogtext"></el-input>
                </el-form-item>
                <el-form-item label="博客标签" prop="types">
                    <el-input v-model="editform.types"></el-input>
                </el-form-item>
                <el-form-item label="发表时间" prop="time">
                    <el-input v-model="editform.time" disabled></el-input>
                </el-form-item>
                <el-form-item label="点赞数量" prop="likes">
                    <el-input v-model="editform.likes" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editblog()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加博客" :visible.sync="adddialogVisible" width="30%">
            <el-form :model="addform" :rules="addrules" ref="addForm" class="demo-ruleForm">
                <el-form-item label="博客id" prop="id">
                    <el-input v-model="addform.id"></el-input>
                </el-form-item>
                <el-form-item label="博客名称" prop="blogname">
                    <el-input v-model="addform.blogname"></el-input>
                </el-form-item>
                <el-form-item label="博客内容" prop="blogtext">
                    <el-input v-model="addform.blogtext"></el-input>
                </el-form-item>
                <el-form-item label="博客标签" prop="types">
                    <el-input v-model="addform.types"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adddialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addblog()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'blog_management',
    data() {
        return {
            res: [],
            types: [],
            page: 1,
            limit: 5,
            editdialogVisible: false,
            editform: {},
            editrules: {
                blogname: [{ required: true, message: '请输入博客名称', trigger: 'blur' }],
                blogtext: [{ required: true, message: '请输入博客内容', trigger: 'blur' }],
                types: [{ required: true, message: '请输入博客标签', trigger: 'blur' }],
            },
            adddialogVisible: false,
            addform: {
                id: 0,
                blogname: '',
                blogtext: '',
                types: '',
            },
            addrules: {
                id: [{ required: true, message: '请输入博客id', trigger: 'blur' }],
                blogname: [{ required: true, message: '请输入博客名称', trigger: 'blur' }],
                blogtext: [{ required: true, message: '请输入博客内容', trigger: 'blur' }],
                types: [{ required: true, message: '请输入博客标签', trigger: 'blur' }],
            },
        };
    },
    computed: {
        blog() {
            let res = [];
            for (let i = 0; i < this.res.length - 1; i++) {
                res.push(this.res[i]);
            }
            return res;
        },
        total() {
            return this.res[this.res.length - 1];
        },
    },
    methods: {
        async searchBlogs() {
            const { data: res } = await this.$http.get('/blog/searchBlogs', {
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
        async getAllTypes() {
            const { data: res } = await this.$http.get('/type/getAllType');
            if (res.code == 0) {
                this.types = res.data;
                console.log(this.types);
            }
        },
        handleSizeChange(newSize) {
            this.limit = newSize;
            this.searchBlogs();
        },
        handleCurrentChange(newPage) {
            this.page = newPage;
            this.searchBlogs();
        },
        async editdialog(id) {
            this.editdialogVisible = true;
            const { data: res } = await this.$http.get('/blog/getblog', {
                params: {
                    id: id,
                },
            });
            if (res.code == 0) {
                this.editform = res.data[0];
                console.log(this.editform);
            } else {
                this.$message.error(res.msg);
            }
        },
        //修改
        async editblog() {
            const { data: res } = await this.$http.get('/blog/alterBlog', {
                params: {
                    id: this.editform.id,
                    name: this.editform.blogname,
                    text: this.editform.blogtext,
                    types: this.editform.types,
                },
            });
            if (res.code == 0) {
                this.$message.success('修改成功');
                this.editdialogVisible = false;
                this.searchBlogs();
            } else {
                this.$message.error(res.msg);
            }
        },
        async deleteblog(id) {
            const { data: res } = await this.$http.get('/blog/deleteBlog', {
                params: {
                    id: id,
                },
            });
            if (res.code == 0) {
                this.$message.success('删除博客成功');
                this.searchBlogs();
            } else {
                this.$message.error(res.msg);
            }
        },
        adddialog() {
            this.adddialogVisible = true;
        },
        addblog() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            const time = year + '-' + month + '-' + day;
            this.$refs.addForm.validate(async valid => {
                if (valid) {
                    const { data: res } = await this.$http.get('/blog/addBlog', {
                        params: {
                            id: this.addform.id,
                            name: this.addform.blogname,
                            text: this.addform.blogtext,
                            types: this.addform.types,
                            time: time,
                        },
                    });
                    if (res.code == 0) {
                        this.$message.success('添加博客成功');
                        this.adddialogVisible = false;
                        this.$refs.addForm.resetFields();
                        this.searchBlogs();
                    } else {
                        this.$message.error(res.msg);
                    }
                } else {
                    this.$message.error('请输入必要的信息');
                }
            });
        },
    },
    mounted() {
        this.searchBlogs();
        this.getAllTypes();
    },
};
</script>

<style scoped>
.pagination {
    margin: 20px 0px;
}
.first {
    background-color: #ffd04b;
    margin: 0px 5px 0px 0px;
    color: #545c64;
}
.types {
    width: 100%;
    height: auto;
    margin: 10px 0px 0px 0px;
}
.type {
    margin: 0px 5px 0px 0px;
}
</style>
