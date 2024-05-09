<template>
    <el-card class="content">
        <div slot="header">
            <span>历史记录</span>
            &nbsp;&nbsp;
            <!--搜索框，用select-->
            <el-select v-model="queryInfo.query" placeholder="请选择搜索内容">
                <el-option label="隐写图像" value="1"></el-option>
                <el-option label="正常图像" value="0"></el-option>
            </el-select>
            &nbsp;&nbsp;
            <!--搜索按钮-->
            <el-button type="primary" icon="el-icon-search" size="medium" @click="getHistoryList(queryInfo)">搜索</el-button>

            <!--导出历史记录-->
            <el-button type="primary" style="float: right" @click="handleDownloadHistory">导出历史记录</el-button>
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
                    <!-- <i class="el-icon-download" @click="handleDownload(scope.row.image)"></i> -->
                    <el-link type="primary" :href="scope.row.image" target="_blank">下载图片</el-link>
                </template>
            </el-table-column>
            <!--判断-->
            <el-table-column prop="judge" label="用户判断结果">
                <template slot-scope="scope">
                    <!--显示结果，点击更改结果，使用el-switch，使用scope.row.u_result-->
                    <el-switch v-model="scope.row.u_result" active-text="隐写图片" inactive-text="正常图片"
                        @change="judge(scope.row.id)"></el-switch>
                </template>
            </el-table-column>

            <!--删除-->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" style="float: right">
        </el-pagination>
        <br>
    </el-card>
</template>

<script>
import { getHistory, delHistory, changeResult, getExcel } from '@/api/history';
export default {
    name: 'History',
    data() {
        return {
            tableData: [],
            queryInfo: {
                query: '',
                // 当前页面
                pagenum: 1,
                // 每页显示条数
                pagesize: 5,
            },
        };
    },
    mounted() {
        this.getHistoryList(this.queryInfo);
    },
    methods: {
        handleDownload(url) {
            window.open(url);
        },
        handleDelete(id) {
            // 弹窗询问是否删除
            this.$confirm('确定删除该历史记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 删除历史记录
                delHistory(id).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        location.reload();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败!'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        judge(id) {
            changeResult(id).then(res => {
                const result = res.message;
                if (result === 1) {
                    this.$notify({
                        title: '成功',
                        message: '用户判断结果更改为隐写图像',
                        type: 'success'
                    });
                } else {
                    this.$notify({
                        title: '成功',
                        message: '用户判断结果更改为正常图像',
                        type: 'success'
                    });
                }
            });
        },
        async handleDownloadHistory() {
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
        async getHistoryList(queryInfo) {
            await getHistory(queryInfo).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data.items;
                    for (let i = 0; i < this.tableData.length; i++) {
                        this.tableData[i].image = 'http://' + this.tableData[i].image;
                        this.tableData[i].image_show = 'http://' + this.tableData[i].image_show;
                    }
                } else {
                    // 弹窗询问是否重新登录
                    this.$confirm('登录已过期，是否登录', '提示', {
                        confirmButtonText: '登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push('/login');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消登录'
                        });
                    });
                }
            });
        },
        // 监听页面大小（pagesize）改变的事件(每页显示多少条)
        handleSizeChange(pagesize) {
            // 改变pagesize的大小
            this.queryInfo.pagesize = pagesize
            // 重新加载用户列表数据
            this.getHistoryList(this.queryInfo)
        },
        // 监听pagenum的事件(点击第几页)
        handleCurrentChange(pagenum) {
            // 把页码改了
            this.queryInfo.pagenum = pagenum
            // 重新加载用户列表数据
            this.getHistoryList(this.queryInfo)
        },
    }
}
</script>

<style>
.content {
    margin-bottom: 70px;
}
</style>