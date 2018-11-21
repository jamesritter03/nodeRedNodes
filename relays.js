module.exports = function (RED) {

    function relaysNode(config) {
        RED.nodes.createNode(this, config);
        this.ip = config.ip;
        this.port = config.port;
        var node = this;
        var http = require('http');
        var mywebservicepath = '/WS';
        var myresource = '/Relays';
        var mymethod = '/writeRelays';
        var mycmd = 'help';
        var myurl = null;
        var myResponse = '';

        node.on('input', function (msg) {

            mycmd = msg.payload;

            myurl = ('http://' + this.ip + ':' + this.port + mywebservicepath + myresource + mymethod + '?Command=' + mycmd);

            var req = http.request(myurl, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                  //  console.log('BODY: ' + chunk);
                    msg.payload = chunk;
                    node.send(msg);
                });
            });
            req.end();

            //   msg.payload = myResponse;
            //   node.send(msg);

        });

    }
    RED.nodes.registerType("relays", relaysNode);

}
