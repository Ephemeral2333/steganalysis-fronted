<template>
    <header class="header has-background-white has-text-black">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">隐写分析</el-menu-item>
            <el-menu-item index="2">
                隐写术
            </el-menu-item>
            <el-menu-item index="3" disabled>历史记录</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">下载结果</a></el-menu-item>
            <!--登录-->
            <el-menu-item index="5" style="float: right" v-if="!isLogin">
                <router-link to="/login">登录</router-link>
            </el-menu-item>
        </el-menu>
    </header>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            activeIndex: '1'
        };
    },

    methods: {
        handleSelect(key, keyPath) {
            this.activeIndex = key;
            if (key === '1') {
                this.$router.push('/');
            } else if (key === '2') {
                this.$router.push('/steganography');
            }
        }
    }
}
</script>

<style scoped>
.header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
