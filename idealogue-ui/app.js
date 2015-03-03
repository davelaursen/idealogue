var express = require('express'),
    app = express(),
    port = 3000;

app.use(express.static(__dirname + '/app/'));

// will serve up index.html if requested file isn't found
app.use(function(req,res) {
    res.sendFile(__dirname + '/app/index.html')
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');