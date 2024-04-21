<template>
    <div>
        <el-card>
            <div slot="header">
                <span>分析结果</span>
            </div>
            <div>
                <p>{{ message }}</p>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getHello } from '@/api/hello';
export default {
    name: 'Tips',
    data() {
        return {
            message: ''
        }
    },
    mounted() {
        
    }
}
</script>
<style></style>