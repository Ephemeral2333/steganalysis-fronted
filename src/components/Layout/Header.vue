<template>
    <header class="header has-background-white has-text-black">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <!--添加项目名称图标-->
            <el-menu-item>
                <img src="../../assets/logo.jpg" alt="logo" style="width: 35px; height: 35px;">
                &nbsp;&nbsp;
                <span class="logoText">隐写分析系统</span>
                <el-divider direction="vertical"></el-divider>
            </el-menu-item>
            <el-menu-item index="1">隐写分析</el-menu-item>
            <el-menu-item index="2">
                隐写术
            </el-menu-item>
            <el-menu-item index="3">历史记录</el-menu-item>
            <!--登录-->
            <el-menu-item index="5" style="float: right">
                <template v-if="!isLogin">
                    <router-link to="/login">登录</router-link>
                </template>
                <template v-else>
                    <el-dropdown @command="logout">
                        <span class="el-dropdown-link">
                            欢迎使用，{{ useremail }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-menu-item>
        </el-menu>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            activeIndex: '1',
            useremail: localStorage.getItem('email')
        };
    },
    computed: {
        isLogin() {
            if (localStorage.getItem('token')) {
                return true;
            } else {
                return false;
            }
        }
    },
    mounted() {
        const currentPath = window.location.pathname; // 返回 "/history"
        const pathParts = currentPath.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart === '') {
            this.activeIndex = '1';
        } else if (lastPart === 'steganography') {
            this.activeIndex = '2';
        } else if (lastPart === 'history') {
            console.log('history');
            this.activeIndex = '3';
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            this.activeIndex = key;
            if (key === '1') {
                this.$router.push('/');
            } else if (key === '2') {
                this.$router.push('/steganography');
            } else if (key === '3') {
                this.$router.push('/history');
            } else if (key === '0') {
                this.activeIndex = '1';
                this.$router.push('/');
            }
        },
        logout() {
            // 弹窗询问是否退出
            this.$confirm('确定退出登录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 清除localStorage中的token
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
                this.$router.push('/').finally(() => {
                    window.location.reload();
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });
            });
        }
    }
}
</script>

<style scoped>
.header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logoText {
    font-size: 15px;
    font-weight: bold;
    font-family: STFangsong;
}
</style>
