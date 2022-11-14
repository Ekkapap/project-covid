const { override, fixBabelImports, addLessLoader, addExternalBabelPlugins } = require('customize-cra');

module.exports = override(
    ...addExternalBabelPlugins(

        "@babel/plugin-proposal-nullish-coalescing-operator"
    ),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#f48549', // customize as needed
                '@link-color': '#e6a07c', // customize as needed
                '@font-size-base': '18px', // customize as needed
                // '@layout-header-height': '48px',
                '@layout-header-background': '#FFFFFF',
            },
        },
    })
);
