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
                        const points = this.chartInstance.getElementsAtEventForMode(
                            e,
                            this.content.config?.options?.interaction?.mode || 'nearest',
                            { intersect: this.content.config?.options?.interaction?.intersect ?? true },
                            true
                        );

                        this.$emit('trigger-event', {
                            name: 'chart:click',
                            event: {
                                position,
                                points: points.map(point => ({
                                    label: this.chartInstance.data.labels[point.index],
                                    value:
                                        typeof this.chartInstance.data.datasets[point.datasetIndex].data[
                                            point.index
                                        ] === 'object'
                                            ? this.chartInstance.data.datasets[point.datasetIndex].data[point.index][
                                                  'y'
                                              ]
                                            : this.chartInstance.data.datasets[point.datasetIndex].data[point.index],
                                    ...point,
                                })),
                            },
                        });
                    },
                },
            };
        },
    },
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
