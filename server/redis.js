var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("postss", JSON.stringify(["kanbus", "ff"]), 'EX', 60 * 30);
client.get("postss", function(err, reply) {
  // reply is null when the key is missing
  console.log(reply);
});
