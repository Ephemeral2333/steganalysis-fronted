<template>
    <el-card class="content">
        <div slot="header">
            <span>测试结果</span>
            &nbsp;&nbsp;
            <el-button plain @click="refresh">刷新</el-button>
            &nbsp;&nbsp;
            <el-input v-model="queryInfo.query" placeholder="请输入搜索内容" style="width: 200px"></el-input>
            &nbsp;&nbsp;
            <el-button type="primary" icon="el-icon-search" size="small" @click="getTestResult(queryInfo)">搜索</el-button>
            <!--导出测试结果-->
            <el-button type="primary" style="float: right" @click="handleDownloadResult">导出测试结果</el-button>
        </div>

        <el-table :data="tableData" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }" height="690">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <!--文件名称-->
            <el-table-column label="文件名称">
                <template slot-scope="scope">
                    <el-link :href="scope.row.url" target="_blank">{{ scope.row.name }}</el-link>
                </template>
            </el-table-column>
            <!--精确率-->
            <el-table-column label="精确率">
                <template slot-scope="scope">
                    <p>{{ scope.row.precision }}</p>
                </template>
            </el-table-column>
            <!--召回率-->
            <el-table-column label="召回率">
                <template slot-scope="scope">
                    <p>{{ scope.row.recall }}</p>
                </template>
            </el-table-column>
            <!--F1值-->
            <el-table-column label="F1值">
                <template slot-scope="scope">
                    <p>{{ scope.row.f1 }}</p>
                </template>
            </el-table-column>
            <!--准确度-->
            <el-table-column label="准确度">
                <template slot-scope="scope">
                    <p>{{ scope.row.accuracy }}</p>
                </template>
            </el-table-column>
            <!--状态-->
            <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.state === 1" type="success">检测成功</el-tag>
                    <el-tag v-else-if="scope.row.state === -1" type="danger">检测失败</el-tag>
                    <el-tag v-else type="info">检测中</el-tag>
                </template>
            </el-table-column>
            <!--时间-->
            <el-table-column prop="created_time" label="时间"></el-table-column>
        </el-table>

        <br>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 30, 40]" :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" style="float: right">
        </el-pagination>
        <br>
    </el-card>
</template>

<script>
import { getTestHistory, getExcel } from '@/api/test';
export default {
    name: 'TestResult',
    data() {
        return {
            tableData: [],
            queryInfo: {
                query: '',
                // 当前页面
                pagenum: 1,
                // 每页显示条数
                pagesize: 10,
            },
        };
    },
    created() {
        this.getTestResult(this.queryInfo);
    },
    methods: {
        refresh() {
            window.location.reload();
        },
        async getTestResult(queryInfo) {
            await getTestHistory(queryInfo).then((res) => {
                this.tableData = res.data.items;
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].url = 'http://' + this.tableData[i].url;
                }
            });
        },
        async handleDownloadResult() {
            const res = await getExcel();
            // 处理导出的Excel文件

            const blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', '导出表');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        },
        handleSizeChange(pagesize) {
            // 改变pagesize的大小
            this.queryInfo.pagesize = pagesize
            // 重新加载用户列表数据
            this.getTestHistory(this.queryInfo)
        },
        // 监听pagenum的事件(点击第几页)
        handleCurrentChange(pagenum) {
            // 把页码改了
            this.queryInfo.pagenum = pagenum
            // 重新加载用户列表数据
            this.getTestHistory(this.queryInfo)
        },
    },
};
</script>

<style>
.content {
    margin-bottom: 70px;
}
</style>