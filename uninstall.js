var async = require('async'),
    pluginManager = require('../pluginManager.js'),
  countlyDb = pluginManager.dbConnection();

console.log("Uninstalling punchcard plugin... \n");

console.log("Modifying database... \n");

countlyDb
  .collection("apps")
  .find({})
  .toArray(function(err, apps) {
    if (!apps || err) {
      console.log("No apps to upgrade");
      countlyDb.close();
      return;
    } else {
      console.log("Uninstall found apps");
    }
  });
