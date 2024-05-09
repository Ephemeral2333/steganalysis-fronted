<template>
    <el-card class="content">
        <div slot="header" class="clearfix">
            <span>结果分析可视化</span>
        </div>

        <div class="chart">
            <div ref="echartsboxpie" style="width: 800px; height: 500px;"></div>
            <div ref="echartsRefs" style="width: 800px; height: 500px;"></div>
        </div>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
import { getCompare } from '@/api/history'
export default {
    name: 'Result',
    data() {
        return {
        };
    },
    mounted() {
        getCompare().then(res => {
            const same = res.data.same;
            const diff = res.data.diff;
            const result = res.data.result;
            this.showEcharts(same, diff, result);
        });
    },
    methods: {
        showEcharts(same, diff, result) {
            const chartBoxpie = echarts.init(this.$refs.echartsboxpie);
            const boxpie = {
                title: {
                    text: '预测结果与用户提供结果对比',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '判断结果',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        padAngle: 5,
                        itemStyle: {
                            borderRadius: 10
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [

                        ]
                    }
                ]
            };
            boxpie.series[0].data = [
                { value: same, name: '预测结果相符' },
                { value: diff, name: '预测结果不符' }
            ];
            chartBoxpie.setOption(boxpie);

            const chartRefs = echarts.init(this.$refs.echartsRefs);
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['正常图像', '隐写图像'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '25%',
                        data: []
                    }
                ],
                title: {
                    text: '预测结果展示',
                    left: 'center'
                }
            };

            option.series[0].data = result;
            chartRefs.setOption(option);
        }
    },
};
</script>

<style>
.content {
    height: 750px;
}

.chart {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>