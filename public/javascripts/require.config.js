require.config({
    packages: [
        {name: 'jquery', location: '../thirdparty/jquery', main: 'jquery.js'},
        {name: 'domready', location: '../thirdparty/requirejs-domready', main: 'domReady.js'},
        {name: 'paper', location: '../thirdparty/paper/dist', main: 'paper.js'},
    ],
    shim: {
        'jquery': { exports: '$'}
    },
    paths: {
    }
});