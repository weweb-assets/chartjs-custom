<template>
    <div class="chart-container" style="position: relative">
        <canvas ref="chartjsLine"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    props: {
        content: { type: Object, required: true },
    },
    setup() {
        return {
            chartInstance: null,
        };
    },
    watch: {
        config: {
            immediate: true,
            deep: true,
            handler() {
                if (this.chartInstance) this.chartInstance.destroy();
                this.initChart();
                this.chartInstance.update();
            },
        },
    },
    mounted() {
        this.initChart();
    },
    beforeUnmount() {
        this.chartInstance.destroy();
    },
    methods: {
        initChart() {
            const element = this.$refs.chartjsLine;
            this.chartInstance = new Chart(element, this.content.config);
        },
    },
};
</script>
