<template>
    <div>
        <el-card>
            <div slot="header">
                <span>上传文件</span>
            </div>
            <div class="upload">
                <el-upload class="upload-demo" drag action="http://127.0.0.1:5000/analyze/result" multiple="false"
                    :on-success="upload_success"
                    :before-upload="isLoggin">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="text-align: center;">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
        </el-card>
    </div>
</template>

<script>
import bus from '@/utils/bus'
import store from '@/store'

export default {
    name: 'Analysis',
    data() {
        return {

        }
    },
    methods: {
        isLoggin() {
            // if (store.state.token === null) {
            //     this.$message.error('请先登录')
            //     return false
            // }
        },
        upload_success(response, file, fileList) {
            console.log(response.message)
            bus.$emit('analyze_result', response.message)
        }
    }
}
</script>

<style>
.upload {
    margin-top: 20px;
    justify-content: center;
    display: flex;
}
</style>