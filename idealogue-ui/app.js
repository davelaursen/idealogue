var express = require('express'),
    app = express(),
    port = 3000;

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app/'));
    app.use(app.router);

    app.use(function(req,res) {
        res.sendfile(__dirname + '/app/index.html')
    })
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');