<template>
    <div id="h">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
        >
            <el-menu-item class="left">
                <div class="imgdiv"></div>
            </el-menu-item>
            <el-menu-item class="middle">
                <el-input
                    placeholder="请输入待搜索的内容..."
                    v-model="kw"
                    class="input"
                    @keyup.enter.native="search()"
                >
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-menu-item>
            <el-menu-item index="/home" class="right">Home</el-menu-item>
            <el-menu-item index="/types" class="right">Type</el-menu-item>
            <el-menu-item index="/search" class="right">Search</el-menu-item>
            <el-menu-item index="/manager" class="right">Manager</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'head',
    data() {
        return {
            kw: '',
        };
    },
    methods: {
        search() {
            if (this.kw != '' && this.kw.trim() != '') {
                this.$router.push({
                    name: 'search',
                    query: {
                        kw: this.kw,
                    },
                });
            } else {
                this.$message.warning('请输入搜索信息');
            }
        },
    },
    props: ['activeIndex'],
};
</script>

<style scoped>
#h {
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #545c64;
    border-bottom: 2px solid transparent;
    height: 58px;
    position: fixed;
    z-index: 10;
}
.imgdiv {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    margin: 10px 0px;
    background-color: white;
    background-size: 40px;
    background-image: url('../assets/logo.png');
}
.input {
    width: 400px;
}
</style>
