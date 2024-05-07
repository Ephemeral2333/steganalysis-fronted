<template>
    <div class="columns">
        <div class="column is-three-quarters">
            <Analysis></Analysis>
        </div>
        <div class="column">
            <Tips></Tips>
        </div>
    </div>
</template>
  
<script>
import Analysis from '@/views/analysis/index.vue';
import Tips from '@/views/tips/index.vue';
export default {
    data() {
        return {
            message: ''
        }
    },
    components: {
        Analysis,
        Tips
    },
    mounted() {
        
    }
}
</script>
  
<style>
</style>