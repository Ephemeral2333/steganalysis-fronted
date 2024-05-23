<template>
    <div>
        <el-card class="content">
            <div slot="header">
                <span>模型训练过程对比</span>
            </div>

            <div class="chart">
                <div ref="echarts" style="width: 900px; height: 500px;"></div>
            </div>
            <br>
            <p style="text-align: center">基于WOW隐写算法下1.0 bpp嵌入率训练过程</p>
        </el-card>
    </div>
</template>
  
<script>
import * as echarts from 'echarts'
import { getTrainData } from '@/api/test'
export default {
    name: 'Train',
    mounted() {
        this.showEcharts();
    },
    methods: {
        async showEcharts() {
            // 绘制动态折线图
            const chart = echarts.init(this.$refs.echarts);
            const option = {
                title: {
                    text: '模型训练过程对比',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['SRNet_CBAM', 'SRNet_PyTorch', 'Origin SRNet'],
                    top: '5%',
                    left: 'center'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                animation: true,
                animationDuration: 10000,
                xAxis: {
                    // 横坐标名称
                    name: 'Epoch',
                    type: 'category',
                    boundaryGap: false,
                    // 一共25个数据，每两个数据之间间隔为2，显示1-50
                    data: Array.from({ length: 25 }, (v, k) => k + 1).map(v => v * 2),
                },
                yAxis: {
                    // 纵坐标名称
                    name: 'Accuracy(%)',
                    type: 'value',
                    // 从60到100，间隔为5
                    min: 60,
                    max: 100,
                    interval: 5
                },
                series: [
                    {
                        name: 'SRNet_CBAM',
                        type: 'line',
                        data: []
                    },
                    {
                        name: 'SRNet_PyTorch',
                        type: 'line',
                        data: []
                    },
                    {
                        name: 'Origin SRNet',
                        type: 'line',
                        data: []
                    }
                ]
            };
            // 获取数据
            await getTrainData().then(res => {
                const data = res;
                option.series[0].data = data.SRNet_CBAM;
                option.series[1].data = data.SRNet_PyTorch;
                option.series[2].data = data.Origin_SRNet;
            });
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
    height: 750px;
}
</style>
  