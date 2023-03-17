export default {
    editor: {
        label: 'Chart - Custom',
        icon: 'logos/chartjs',
    },
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
