if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(['requirejs'], function(requirejs, undefined) {
  var suites = [];

  suites.push({
    name: "baseClient.js tests",
    desc: "a collection of tests for baseClient.js",
    setup: function(env) {
      var _this = this;
      requirejs(['./src/lib/baseClient'], function(BaseClient) {
        env.BaseClient = BaseClient;
        _this.assertType(BaseClient, 'function');
      });
    },
    takedown: function(env) {
      env = '';
      this.result(true);
    },
    tests: [
      {
        desc: "constructor w/o moduleName throws an exception",
        run: function(env) {
          try {
            new env.BaseClient();
          } catch(exc) {
            this.result(true);
            return;
          }
          this.result(false);
        }
      },
      {
        desc: "constructor w/ moduleName returns a new client instance",
        run: function(env) {
          var client = new env.BaseClient('test');
          this.assertTypeAnd(client, 'object');
          this.assertAnd(client instanceof env.BaseClient, true);
          this.assert(client.moduleName, 'test');
          env.client = client;
        }
      },
      {
        desc: "makePath prefixes paths correctly",
        run: function(env) {
          var path = env.client.makePath('foo/bar/baz');
          this.assert(path, '/test/foo/bar/baz');
        }
      }
    ]
  });
  return suites;
});