<template>
    <div style="position: relative">
        <canvas ref="chartjsCustom"></canvas>
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
        'content.config': {
            immediate: true,
            deep: true,
            handler() {
                if (this.chartInstance) this.chartInstance.destroy();
                this.initChart();
                this.chartInstance.update();
            },
        },
    },
    beforeUnmount() {
        this.chartInstance.destroy();
    },
    methods: {
        initChart() {
            const element = this.$refs.chartjsCustom;
            this.chartInstance = new Chart(element, this.content.config);
        },
    },
};
</script>
