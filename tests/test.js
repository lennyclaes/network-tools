const { networkTools } = require('../dist/index.js');

networkTools("192.168.0.56", "255.255.255.0").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

networkTools("172.18.25.13/16").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

networkTools("172.18.25.55/35").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

networkTools().then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});