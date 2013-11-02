require.config({
    packages: [
        {name: 'jquery', location: '../thirdparty/jquery', main: 'jquery.js'},
        {name: 'domready', location: '../thirdparty/requirejs-domready', main: 'domReady.js'},
    ],
    shim: {
        'jquery': { exports: '$'}
    },
    paths: {
    }
});