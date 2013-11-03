require.config({
    packages: [
        {name: 'jquery', location: '../thirdparty/jquery', main: 'jquery.js'},
        {name: 'domready', location: '../thirdparty/requirejs-domready', main: 'domReady.js'},
        {name: 'paper', location: '../thirdparty/paper/dist', main: 'paper.js'},
        {name: 'knob', location: '../thirdparty/knob', main: 'jquery.knob.js'},
    ],
    shim: {
        'jquery': { exports: '$'},
        'knob': {deps: ['jquery']}
    },
    paths: {
    }
});