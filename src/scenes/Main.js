function resizeApp() {
    'use strict';

    let gameRatio = 360 / 640;
    let div = document.getElementById('phaser-app');
    div.style.width = window.innerHeight * gameRatio + 'px';
    div.style.height = window.innerHeight + 'px';

    let canvas = document.getElementsByTagName('canvas')[0];

    let dpiW = (parseInt(div.style.width) / canvas.width);
    let dpiH = (parseInt(div.style.height) / canvas.height);

    let height = window.innerHeight * (dpiW / dpiH);
    let width = height * gameRatio;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px'; 
}

function runApp() {
    'use strict';

    let app = new App();
    app.start();

    window.addEventListener('resize', resizeApp);
    resizeApp();
}

window.onload = function () {
    runApp();
}