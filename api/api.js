var plugin = {},
  common = require("../../../api/utils/common.js"),
  plugins = require("../../pluginManager.js"),
  countlyDb = plugins.dbConnection();

(function(plugin) {
  plugins.register("/i", function(ob) {
    console.log("\nGot request to /i\n");
    var qstring = ob.params.qstring;
    var dow = qstring.dow;
    var hour = qstring.hour;
    // Store the data in the database for visualization
    countlyDb
      .collection("events_" + ob.app._id)
      .insert({ type: ob.app.type, dow, hour });
    return true;
  });
  plugins.register("/o", function(ob) {
    // Example request
    // curl --request GET \
    //     --url "http://192.168.1.47/o?app_key=..&api_key=...&app_id=...&punchcard=true"
    if (ob && ob.params && ob.params.qstring.punchcard) {
      console.log("\nCaught our request to /o\n");
      var params = ob.params;
      var app_id = params.qstring.app_id;
      countlyDb
        .collection("events_" + app_id)
        .find()
        .toArray(function(err, events) {
          if (err || !events) {
            return false;
          } else {
            // remove object id from results
            events.map(event => {
              delete event._id;
              return event;
            });
            // respond with data
            common.returnOutput(params, events);
          }
        });
    }
    return true;
  });
})(plugin);

module.exports = plugin;
