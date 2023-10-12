<template>
    <div style="position: relative">
        <canvas ref="chartjsCustom"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
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
    computed: {
        config() {
            return {
                ...(this.content.config || {}), 
                options: {
                    ...(this.content.config?.options || {}), 
                    onClick: e => {
                        const position = getRelativePosition(e, this.chartInstance);

                        // Substitute the appropriate scale IDs
                        const dataX = this.chartInstance.scales.x.getValueForPixel(position.x);
                        const dataY = this.chartInstance.scales.y.getValueForPixel(position.y);
                        this.$emit('trigger-event', {
                            name: 'chart:click',
                            event: { dataX, dataY, position },
                        });
                    }
                }
            }
        }
    }
    watch: {
        'content.config': {
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
            const element = this.$refs.chartjsCustom;
            this.chartInstance = new Chart(element, this.config);
        },
    },
};
</script>
