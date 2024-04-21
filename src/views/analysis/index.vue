<template>
    <div>
        <el-card>
            <div slot="header">
                <span>上传文件</span>
            </div>
            <div class="upload">
                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="text-align: center;">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
        </el-card>
    </div>
</template>

<script>

export default {
    name: 'Analysis',
    data() {

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