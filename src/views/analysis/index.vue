<template>
    <div>
        <el-card class="content">
            <div slot="header">
                <span>隐写分析</span>
            </div>
            <div class="upload">
                <el-upload class="upload-demo" drag action="http://127.0.0.1:5000/analyze/result" multiple="false"
                    :on-success="upload_success" :before-upload="beforeUpload" :data="uploadData">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="text-align: center;">建议上传pgm文件，且文件大小不超过10M</div>
                </el-upload>
            </div>
            <br><br>
            <div class="tip">
                <!--使用注意事项-->
                <el-card>
                    <div slot="header">
                        <span>注意事项</span>
                    </div>
                    <div>
                        <p>1、请在登录后再进行隐写分析，历史结果可在历史记录中查看</p>
                        <p>2、目前隐写分析效果最好的是.pgm格式的图片，请注意</p>
                        <p>3、建议不要上传过大的文件，影响分析速度</p>
                    </div>
                </el-card>
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
            uploadData: {
                email: localStorage.getItem('email')
            }
        }
    },
    methods: {
        beforeUpload() {
            if (localStorage.getItem('token') === null) {
                this.$message.error('请先登录')
                return false
            }
        },
        upload_success(response, file, fileList) {
            if (response.code !== 200) {
                this.$message.error(response.message)
            } else {
                bus.$emit('analyze_result', response.message)
            }
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
.content {
    height: 700px;
}
</style>