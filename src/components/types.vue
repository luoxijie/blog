<template>
    <div id="types">
        <div class="top"><p>热度前10标签</p></div>
        <div
            v-for="(item, index) in types"
            :key="item.id"
            class="bottom"
            @click="searchType(item.id)"
        >
            <span class="span1">{{ index + 1 }}.{{ item.typename }}</span>
            <span class="span2">{{ item.typeheat }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'types',
    data() {
        return {
            types: [],
        };
    },
    methods: {
        async getTypes() {
            const { data: res } = await this.$http.get('/type/getTopType');
            console.log(res);
            if (res.code == 0) {
                this.types = res.data;
            } else {
                this.$message.error(res.msg);
            }
        },
        searchType(id) {
            this.$router.push({
                name: 'types',
                query: {
                    typeid: id,
                },
            });
        },
    },
    mounted() {
        this.getTypes();
    },
};
</script>

<style scoped>
#types {
    width: 230px;
    height: 300px;
    /* border: 1px solid black; */
    border-radius: 5px;
    background-color: #545c64;
    box-shadow: 6px 6px 12px black;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 180px;
    left: 1200px;
    justify-content: space-around;
}
#types div {
    width: 95%;
    height: 8%;
    /* border: 1px solid red; */
}
.top {
    text-align: center;
}
.top p {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    color: #fff;
}
.bottom {
    color: #fff;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
}
.bottom:hover {
    color: #ffd04b;
}
.span1 {
    width: auto;
}
.span2 {
    width: auto;
}
</style>
