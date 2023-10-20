export default {
    editor: {
        label: 'Chart - Custom',
        icon: 'logos/chartjs',
    },
    triggerEvents: [
        {
            name: 'chart:click',
            label: { en: 'On chart click' },
            event: {
                position: { x: 0, y: 0 },
                points: [{ label: '', value: 0, index: 0, datasetIndex: 0 }],
            },
        },
    ],
    properties: {
        config: {
            label: 'Config',
            type: 'Info',
            options: { text: 'Chart config' },
            section: 'settings',
            bindable: 'list',
            responsive: true,
            states: true,
            defaultValue: {},
        },
    },
};
