<template>
    <div>
        <el-card class="content">
            <div slot="header">
                <span>隐写嵌入</span>
            </div>

            <el-row>
                <el-col :span="12">
                    <el-form ref="form" :model="form">
                        <el-form-item label="选择文件">
                            <el-upload ref="upload" class="upload-demo" drag action="http://" :on-success="upload_success"
                                :before-upload="isLoggin" :auto-upload="false" accept=".pgm">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip" style="margin-left: 190px;">只能上传pgm文件</div>
                            </el-upload>
                        </el-form-item>
                        <!--添加两个单选框-->
                        <el-form-item label="选择隐写方式">
                            <el-radio-group v-model="form.radio">
                                <el-radio label="1">HUGO</el-radio>
                                <el-radio label="2">WOW</el-radio>
                                <el-radio label="3">S-Uniward</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="选择嵌入率">
                            <el-radio-group v-model="form.alpha">
                                <el-radio label="0.4">0.4 bpp</el-radio>
                                <el-radio label="0.7">0.7 bpp</el-radio>
                                <el-radio label="1.0">1.0 bpp</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('form')">提交</el-button>
                            <el-button @click="downloadUrl" style="display:none" class="download">下载</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <div class="tip">
                        <el-card>
                            <div slot="header">
                                <span>注意事项</span>
                            </div>
                            <div>
                                <p>1、使用隐写术可以无需登录，该功能仅作工具使用，无需登录，也没有历史记录</p>
                                <p>2、目前隐写术不能指定隐写内容，使用的隐写术仅用作测试隐写分析效果，隐写术均随机嵌入该嵌入率下的最不容易被分析出来的内容</p>
                                <p>3、隐写术嵌入率越低，嵌入内容越不容易被分析出来</p>
                                <p>4、目前给出的隐写术均为空域隐写算法，请给出.pgm格式的文件</p>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { insertInfo } from '@/api/steganography'
export default {
    name: 'Steganography',
    data() {
        return {
            form: {
                radio: '1',
                alpha: '0.4'
            },
            url: ''
        }
    },
    methods: {
        isLoggin() {
            if (localStorage.getItem('token') === null) {
                this.$message.error('请先登录')
                return false
            }
        },
        upload_success(response, file, fileList) {

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const formData = new FormData();
                    if (this.$refs.upload.uploadFiles.length === 0) {
                        this.$message.error('请上传文件')
                        return false
                    } else if(this.$refs.upload.uploadFiles[0].name.split('.')[1] !== 'pgm'){
                        this.$message.error('请上传PGM格式文件')
                        return false
                    } else {
                        formData.append('file', this.$refs.upload.uploadFiles[0].raw);
                    }
                    formData.append('radio', this.form.radio);
                    formData.append('alpha', this.form.alpha);

                    insertInfo(formData).then(res => {
                        if (res.code === 200) {
                            const url = 'http://' + res.message.url;
                            this.url = url;
                            this.$message.success('上传成功')
                            // 上传成功后，下载按钮显示
                            document.querySelector('.download').style.display = 'inline-block';
                            // 清除上传文件
                            this.$refs.upload.clearFiles();
                        } else {
                            this.$message.error('上传失败') 
                        }
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        downloadUrl() {
            console.log(this.url)
            const a = document.createElement('a');
            a.href = this.url;
            a.setAttribute('download', this.url.substring(this.url.lastIndexOf('/') + 1));
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
}
</script>

<style>
.content {
    height: 700px;
}
</style>