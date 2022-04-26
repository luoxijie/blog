<template>
    <div id="manager">
        <el-container>
            <el-header>
                <H :activeIndex="activeIndex"></H>
            </el-header>
            <el-container>
                <el-aside width="250px" style="background-color: #545c64">
                    <el-menu
                        default-active="/blog_management"
                        mode="vertical"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        class="menu"
                        router
                    >
                        <el-menu-item index="/blog_management" class="menu_item">
                            <i class="el-icon-reading"></i>
                            Blog management
                        </el-menu-item>
                        <el-menu-item index="/comment_management" class="menu_item">
                            <i class="el-icon-chat-line-square"></i>
                            Comment management
                        </el-menu-item>
                        <el-menu-item index="/tag_management" class="menu_item">
                            <i class="el-icon-collection-tag"></i>
                            Tag management
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
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
    name: 'manager',
    components: {
        H,
        F,
    },
    data() {
        return {
            activeIndex: '/manager',
        };
    },
    methods: {},
    mounted() {
        this.$router.push('/blog_management');
    },
};
</script>

<style scoped>
.menu {
    border-right: none;
}
</style>
