var rlite = require('rlite-router');

module.exports = function(RED) {
  function Routing(config) {
    RED.nodes.createNode(this, config);
    var routes = config.rules || [];
    var is404 = false;
    var node = this;

    var dispatch = function(routeI, params, message) {
      message.params = params;
      var outputsPorts = [];
      outputsPorts[routeI] = message;
      node.send(outputsPorts);
      
      if (is404) {
        node.status({});
        is404 = false;
      }
    };

    var routesDefinitions = {};
    for (var i = 0, l = routes.length; i < l; ++i) {
      routesDefinitions[routes[i].v] = dispatch.bind(node, i);
    }

    var router = rlite(function() {
      if (!is404) {
        node.status({
          shape: "dot",
          fill: "red",
          text: "route not found"
        });
        is404 = true;
      }
    }, routesDefinitions);

    node.on("input", function(msg) {
      router(msg.topic, msg);
    });
  }

  RED.nodes.registerType("routing", Routing);
}