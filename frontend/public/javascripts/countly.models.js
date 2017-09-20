// var countlyModel = require("../../../../api/lib/countly.model.js"),
//   countlyCommon = require("../../../../api/lib/countly.common.js");

(function() {
  //we will store our data here
  var _data = {};

  //Initializing model
  countlyPunchcard.initialize = function() {
    //returning promise
    return $.ajax({
      type: "GET",
      url: "/o",
      data: {
        //providing current user's api key
        api_key: countlyGlobal.member.api_key,
        //providing current app's id
        app_id: countlyCommon.ACTIVE_APP_ID,
        //specifying method param
        method: "punchcard",
        // alternative selector
        punchcard: true
      },
      success: function(json) {
        //got our data, let's store it
        _data = json;
      }
    });
  };

  //return data that we have
  countlyPunchcard.getData = function() {
    console.log(_data);
    return _data;
  };

  window.countlyPunchcard = window.countlyPunchcard || {};
})((window.countlyPunchcard = window.countlyPunchcard || {}), jQuery);
