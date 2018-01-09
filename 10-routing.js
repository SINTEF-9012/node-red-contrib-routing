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

    var router = rlite(function(params, message, url) {
      if (!is404) {
        node.status({
          shape: "dot",
          fill: "yellow",
          text: "route not found"
        });
        is404 = true;
      }
      node.warn("The route for the topic \""+url+"\" has not been found.");
    }, routesDefinitions);

    node.on("input", function(msg) {
      router(msg.topic, msg);
    });
  }

  RED.nodes.registerType("routing", Routing);
}