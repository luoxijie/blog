<template>
    <div id="master">
        <div class="image"></div>
        <div class="msg">
            <p>name:断手小螃蟹</p>
            <p>QQ:1500702826</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'master',
    data() {
        return {};
    },
};
</script>

<style scoped>
#master {
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
}
#master div {
    /* border: 1px solid red; */
    margin: 10px auto;
    text-align: center;
}
.image {
    width: 60%;
    height: 50%;
    border-radius: 50%;
    background-image: url('../assets/xw.jpg');
    background-size: 100%;
}
.msg {
    width: 60%;
    height: 40%;
    color: #fff;
}
.msg p:hover {
    color: #ffd04b;
}
</style>
