<template>
    <header class="header has-background-white has-text-black">
        <!-- <b-navbar
            class="container is-white"
            :fixed-top="true"
        >
            <template slot="start">
                <b-navbar-item
                    tag="router-link"
                    :to="{ path: '/' }"
                >
                    🌐 主页
                </b-navbar-item>
                <b-navbar-item
                    tag="router-link"
                    :to="{ path: '/tip/post' }"
                >
                    📚 每日一句投稿
                </b-navbar-item>
                <b-navbar-item
                    tag="router-link"
                    :to="{ path: '/my/collection' }"
                >
                    ⭐ 我的收藏
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <b-field position="is-centered">
                        <b-input
                            v-model="searchKey"
                            class="s_input"
                            width="80%"
                            placeholder="搜索帖子、标签和用户"
                            rounded
                            clearable
                            @keyup.enter.native="search()"
                        />

                        <p class="control">
                            <b-button
                                class="is-info"
                                @click="search()"
                            >检索
                            </b-button>
                        </p>
                    </b-field>
                </b-navbar-item>

                <b-navbar-item tag="div">
                    <b-switch
                        v-model="darkMode"
                        passive-type="is-warning"
                        type="is-dark"
                    >
                        {{ darkMode ? "夜" : "日" }}
                    </b-switch>
                </b-navbar-item>

                <b-navbar-item
                    v-if="token == null || token === ''"
                    tag="div"
                >
                    <div class="buttons">
                        <b-button
                            class="is-light"
                            tag="router-link"
                            :to="{ path: '/register' }"
                        >
                            注册
                        </b-button>
                        <b-button
                            class="is-light"
                            tag="router-link"
                            :to="{ path: '/login' }"
                        >
                            登录
                        </b-button>
                    </div>
                </b-navbar-item>
                <b-navbar-dropdown
                    v-else
                    :label="user.nickname"
                >
                    <b-navbar-item
                        tag="router-link"
                        :to="{ path: `/member/${user.username}/home` }"
                    >
                        🧘 个人中心
                    </b-navbar-item>
                    <hr class="dropdown-divider">
                    <b-navbar-item
                        tag="a"
                        @click="toBackend()"
                    >
                        ⚙ 设置中心
                    </b-navbar-item>
                    <hr class="dropdown-divider">
                    <b-navbar-item
                        tag="a"
                        @click="logout"
                    > 👋 退出登录
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>
        </b-navbar> -->

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2">
                我的工作台
            </el-menu-item>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
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
            
        }
    }
}
</script>

<style scoped>
.header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
