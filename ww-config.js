export default {
    editor: {
        label: 'Chart - Custom',
        icon: 'logos/chartjs',
    },
    properties: {
        config: {
            label: 'Config',
            type: 'Info',
            options: { text: 'Chart Datasets' },
            responsive: true,
            section: 'settings',
            bindable: 'list',
            defaultValue: {},
            hidden: content => content.dataType !== 'advanced',
        },
    },
};
