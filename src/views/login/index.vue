<template>
    <div class="login-container">
        <el-card class="login-card">
            <div slot="header" class="header">
                <span>邮箱登录</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px" class="login-form">
                <el-form-item label="邮箱" prop="email" class="form-item" :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha" class="form-item">
                    <div class="captcha-wrapper">
                        <el-input v-model="form.captcha" placeholder="请输入验证码"></el-input>
                        <el-button class="captcha-button" type="primary" @click="sendCaptcha">获取验证码</el-button>
                    </div>
                </el-form-item>
                <el-form-item class="form-item">
                    <el-button type="primary" class="login-button" @click="onLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>
  
<script>
import { getCaptcha, login } from '@/api/login'
export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                captcha: ''
            }
        }
    },
    methods: {
        onLogin() {
            // 验证邮箱是否符合规范
            if (!this.form.email) {
                this.$message.error('请输入邮箱地址')
                return
            } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.email)) {
                this.$message.error('请输入正确的邮箱地址')
                return
            }

            // 验证验证码
            if (!this.form.captcha) {
                this.$message.error('请输入验证码')
                return
            } else {
                // 登录并获取res
                login(this.form.email, this.form.captcha).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.$message.success('登录成功')
                        // 将token存储到store中
                        // this.$store.commit('setToken', res.data.token)
                        // 跳转到首页
                        this.$router.push('/')
                    } else {
                        this.$message.error('登录失败')
                    }
                })
            }
        },
        async sendCaptcha() {
            // 验证邮箱是否符合规范
            if (!this.form.email) {
                this.$message.error('请输入邮箱地址')
                return
            } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.email)) {
                this.$message.error('请输入正确的邮箱地址')
                return
            } else {
                await getCaptcha(this.form.email)
                this.$message.success('验证码已发送')
            }
        }
    }
}
</script>
  
<style>
.login-card {
    width: 550px;
    margin: 50px auto;
}

.header {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
}

.login-form {
    padding: 20px;
}

.form-item {
    margin-bottom: 20px;
}

.captcha-wrapper {
    display: flex;
    align-items: center;
}

.captcha-button {
    margin-left: 10px;
}

.login-button {
    width: 100%;
}
</style>
  