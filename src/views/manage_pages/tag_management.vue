<template>
    <div id="type_management">
        <el-button type="info" @click="show_add_dialog()">add</el-button>
        <el-table :data="types" style="width: 100%; margin: 20px 0px" height="750" stripe border>
            <el-table-column prop="id" label="标签id"></el-table-column>
            <el-table-column prop="typename" label="标签名称"></el-table-column>
            <el-table-column prop="typeheat" label="标签热度"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="show_edit_dialog(scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger" @click="delete_type(scope.row.id)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加标签" :visible.sync="adddialogVisible" width="30%">
            <el-form :model="addform" :rules="addrules" ref="addForm" class="demo-ruleForm">
                <el-form-item label="标签名称" prop="blogname">
                    <el-input v-model="addform.typename"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adddialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add_type()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改标签信息" :visible.sync="editdialogVisible" width="30%">
            <el-form :model="editform" :rules="editrules" ref="editForm" class="demo-ruleForm">
                <el-form-item label="标签名称" prop="ctext">
                    <el-input v-model="editform.typename"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit_type()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'tag_management',
    data() {
        return {
            types: [],
            editdialogVisible: false,
            editform: {},
            editrules: {
                typename: [{ required: true, message: '请输入博客名称', trigger: 'blur' }],
            },
            adddialogVisible: false,
            addform: {
                typename: '',
            },
            addrules: {
                typename: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
            },
        };
    },
    methods: {
        async getAllType() {
            const { data: res } = await this.$http.get('/type/getAllType');
            if (res.code == 0) {
                this.types = res.data;
                console.log(this.types);
            } else {
                this.$message.error(res.msg);
            }
        },
        show_add_dialog() {
            this.adddialogVisible = true;
        },
        add_type() {
            this.$refs.addForm.validate(async valid => {
                if (valid) {
                    const { data: res } = await this.$http.get('/type/addType', {
                        params: {
                            typename: this.addform.typename,
                        },
                    });
                    if (res.code == 0) {
                        this.$message.success('添加成功');
                        this.adddialogVisible = false;
                        this.getAllType();
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            });
        },
        async delete_type(id) {
            const { data: res } = await this.$http.get('/type/deleteType', {
                params: {
                    typeid: id,
                },
            });
            if (res.code == 0) {
                this.$message.success('删除成功');
                this.getAllType();
            } else {
                this.$message.error(res.msg);
            }
        },
        show_edit_dialog(row) {
            this.editform = row;
            this.editdialogVisible = true;
        },
        async edit_type() {
            this.$refs.editForm.validate(async valid => {
                if (valid) {
                    const { data: res } = await this.$http.get('/type/alterType', {
                        params: {
                            typeid: this.editform.id,
                            typename: this.editform.typename,
                        },
                    });
                    if (res.code == 0) {
                        this.$message.success('修改成功');
                        this.editdialogVisible = false;
                        this.getAllType();
                    } else {
                        this.$message.error(res.msg);
                    }
                }
            });
        },
    },
    mounted() {
        this.getAllType();
    },
};
</script>

<style scoped></style>
