<template>
    <div class="result">
        <el-card>
            <div slot="header">
                <span>分析结果</span>
            </div>
            <div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="image" label="图片">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.image" :fit="fit" @click.native="handleDownload(scope.row.image)">

                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="result" label="结果">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.result === '隐写图片'" type="success">{{ scope.row.result }}</el-tag>
                            <el-tag v-else type="danger">{{ scope.row.result }}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
import bus from '@/utils/bus'
export default {
    name: 'Tips',
    mounted() {
        bus.$on('analyze_result', msg => {
            console.log(msg)
            const image = 'http://' + msg.url
            const result = msg.result
            /* 添加到table去 */
            this.tableData.push({
                image: image,
                result: result
            })
        })
    },
    data() {
        return {
            tableData: [{
                image: 'https://www.baidu.com/img/bd_logo1.png',
                result: '百度'
            }, {
                image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                result: '谷歌'
            }]
        }
    },
    methods: {
        handleDownload(url) {
            // 下载图片
            const a = document.createElement('a');
            a.href = url;
            a.download = url.substring(url.lastIndexOf('/') + 1); // 设置下载文件的名称，这里取URL最后的部分作为文件名
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
}
</script>
<style>
.result {
    margin-bottom: 50px;
}
</style>