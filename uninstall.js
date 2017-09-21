var async = require("async"),
  pluginManager = require("../pluginManager.js"),
  countlyDb = pluginManager.dbConnection();

console.log("Uninstalling punchcard plugin... \n");

countlyDb
  .collection("apps")
  .find({})
  .toArray(function(err, apps) {
    if (!apps || err) {
      return;
    }
    function upgrade(app, done) {
      var cnt = 0;
      console.log("Dropping events collection for " + app.name);
      countlyDb.dropCollection("events_" + app._id);
    }
    async.forEach(apps, upgrade, function() {
      console.log("Punchcard plugin removed successfully");
      countlyDb.close();
    });
  });
