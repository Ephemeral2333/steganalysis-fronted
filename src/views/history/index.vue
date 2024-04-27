<template>
    <el-card>
        <div slot="header">
            <span>历史记录</span>
        </div>

        <el-table :data="tableData" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <!--图片预览-->
            <el-table-column label="图片" width="180">
                <template slot-scope="scope">
                    <el-image :src="scope.row.image_show" :fit="fit"></el-image>
                </template>
            </el-table-column>
            <!--结果-->
            <el-table-column prop="result" label="结果">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.result === 0" type="danger">正常图片</el-tag>
                    <el-tag v-else type="success">隐写图片</el-tag>
                </template>
            </el-table-column>
            <!--时间-->
            <el-table-column prop="created_time" label="时间"></el-table-column>
            <!--下载-->
            <el-table-column label="下载">
                <template slot-scope="scope">
                    <i class="el-icon-download" @click="handleDownload(scope.row.image)"></i>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import { getHistory } from '@/api/history';
export default {
    name: 'History',
    data() {
        return {
            tableData: []
        };
    },
    created() {
        getHistory().then(res => {
            if (res.code === 200) {
                this.tableData = res.data;
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].image = 'http://' + this.tableData[i].image;
                    this.tableData[i].image_show = 'http://' + this.tableData[i].image_show;
                }
            }
        });
    },
    methods: {
        handleDownload(url) {
            window.open(url);
        }
    }
}
</script>

<style></style>