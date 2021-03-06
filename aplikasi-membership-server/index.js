var http = require("http");

var port = Number(process.env.PORT || 5000);

http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(port);

console.log("App ready at port "+port);

var REDISTOGO_URL = "redis://redistogo:8adc4536655ce179e2645ae4abd70eb2@pearlfish.redistogo.com:9930/";

var rtg   = require("url").parse(REDISTOGO_URL);
var redis = require("redis").createClient(rtg.port, rtg.hostname);
redis.auth(rtg.auth.split(":")[1]);

var displayContent = function(){
    redis.get("nama", function(err, reply){
        console.log("Nama : "+reply);
        redis.expire("nama", 1);    
    });

    redis.get("email", function(err, reply){
        console.log("Email : "+reply);
        redis.expire("email", 1);    
    });
};

redis.on("connect", function(){
    redis.set("nama", "Endy Muhardin");
    redis.set("email", "endy.muhardin@gmail.com");
    displayContent();
});