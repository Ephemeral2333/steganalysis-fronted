<template>
    <div class="result">
        <el-card>
            <div slot="header">
                <span>分析结果</span>
            </div>
            <div>
                <el-table :data="tableData" :header-cell-style="{ 'text-align': 'center' }"
                    :cell-style="{ 'text-align': 'center' }" style="width: 100%">
                    <el-table-column prop="image" label="图片">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.jpeg_image" :fit="fit" @click.native="">
                            </el-image>
                        </template>
                    </el-table-column>
                    <!--添加下载图标-->
                    <el-table-column label="下载">
                        <template slot-scope="scope">
                            <!--注意使用icon-->
                            <i class="el-icon-download" @click="handleDownload(scope.row.image)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column prop="result" label="结果">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.result === '隐写图片'" type="danger">{{ scope.row.result }}</el-tag>
                            <el-tag v-else type="success">{{ scope.row.result }}</el-tag>
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
            const image = 'http://' + msg.url
            const result = msg.result
            const jpeg_image = 'http://' + msg.jpeg_url
            /* 添加到table去 */
            this.tableData.push({
                image: image,
                result: result,
                jpeg_image: jpeg_image
            })
        })
    },
    data() {
        return {
            tableData: [

            ]
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