<template>
    <div>
        <el-card class="content">
            <div slot="header" class="clearfix">
                <span>模型测试对比</span>
            </div>
            <h3 style="text-align: center">不同隐写模型在不同隐写算法下不同嵌入率的准确率对比</h3>
            <div class="chart">
                <div ref="echarts" style="width: 1000px; height: 600px;"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'ModelTest',
    mounted() {
        this.showEcharts();
    },
    methods: {
        showEcharts() {
            const chart = echarts.init(this.$refs.echarts);
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    max: 100,
                    min: 0,
                    axisLabel: {
                        formatter: '{value}%'
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['wow 1.0bpp', 'wow 0.7bpp', 'wow 0.4bpp', 'HUGO 1.0bpp', 'HUGO 1.0bpp', 'HUGO 1.0bpp', 'S-UNIWARD 1.0bpp', 'S-UNIWARD 1.0bpp', 'S-UNIWARD 1.0bpp']
                },
                series: [
                    {
                        name: 'Origin SRNet',
                        type: 'bar',
                        data: [90.5, 85.57, 72.14, 91.92, 90.22, 84.49, 90.14, 85.38, 70.27],
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{c}%'
                        }
                    },
                    {
                        name: 'SRNet_PyTorch',
                        type: 'bar',
                        data: [92.25, 91.0, 83.23, 90.15, 90.83, 83.45, 92.43, 91.63, 85.0],
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{c}%'
                        }
                    },
                    {
                        name: 'SRNet_CBAM',
                        type: 'bar',
                        data: [92.48, 91.4, 82.25, 92.4, 91.43, 84.25, 92.7, 92.03, 86.28],
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{c}%'
                        }
                    }
                ]
            };
            chart.setOption(option);
        }
    }
};
</script>

<style>
.chart {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    height: 780px;
}
</style>