var dataCSV = "";
var finalData = "";

var mockData =
    ",0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23\n\
    Sunday,0,0,0,0,0,0,3,445,544,818,756,477,538,493,589,611,351,650,211,5,1,0,0,0\n\
    Monday,0,0,0,1,0,0,144,2193,2667,5443,5444,5029,6198,4324,4849,4051,2894,2667,1471,832,510,417,64,0\n\
    Tuesday,3,5,3,1,0,0,230,1716,2936,3954,4516,3955,4081,3628,3928,3481,3094,2688,2068,1260,1119,622,209,14\n\
    Wednesday,0,0,0,9,0,0,242,2308,4310,4680,4065,4727,4615,4628,4964,4282,4748,4564,3215,1642,987,714,306,0\n\
    Thursday,0,0,0,3,0,0,247,1992,3912,4536,3436,4633,4083,3728,3516,2339,2915,2345,1403,826,741,375,219,1\n\
    Friday,0,0,0,0,0,0,132,1367,2226,2618,1883,2428,2005,1991,2190,1495,1824,1448,800,556,366,319,13,0\n\
    Saturday,0,0,0,6,0,0,46,411,624,684,800,332,154,72,98,448,353,532,270,4,0,0,0,0";

window.PunchcardView = countlyView.extend({
  //initalize out model
  beforeRender: function() {
    if (this.tmeplate) {
      return $.when(countlyPunchcard.initialize()).then(function() {});
    } else {
      var self = this;
      return $.when(
        $.get(
          countlyGlobal["path"] + "/punchcard/templates/punchcard.html",
          function(src) {
            self.template = Handlebars.compile(src);
          }
        ),
        countlyPunchcard.initialize()
      ).then(function() {
        // dataCSV = mockData;
        dataCSV = transformForD3(countlyPunchcard.getData());
      });
    }
  },

  //render our data
  renderCommon: function(isRefresh) {
    // var data = countlyPunchcard.getData();

    //prepare template data
    this.templateData = {
      "page-title": "punchcard",
      "logo-class": ""
    };

    //if loading first time and not refershing
    // if (!isRefresh) {
    //build template with data
    $(this.el).html(this.template(this.templateData));
  }
});
//create view
app.punchcardView = new PunchcardView();

//register route
app.route("/analytics/punchcard", "punchcard", function() {
  this.renderWhenReady(this.punchcardView);
});

//add menu item, load d3.js, etc
$(document).ready(function() {
  if (!production) {
    console.log("Not production");
    // load minified d3
    CountlyHelpers.loadJS("punchcard/javascripts/d3.min.js");
    // load our d3 code
    CountlyHelpers.loadJS("punchcard/javascripts/d3.impl.js");
  } else {
    console.log("Production");
  }
  var menu =
    '<a href="#/analytics/punchcard" class="item">' +
    '<div class="logo"></div>' +
    '<div class="text" data-localize="punchcard.title"></div>' +
    "</a>";
  $("#web-type #analytics-submenu").append(menu);
  $("#mobile-type #analytics-submenu").append(menu);
});

/**
 * data is an array, returns a string
 */
function transformForD3(data) {
  let stringData = "";
  let daysOfWeek = [
    "",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let stringArray = new Array(8);
  for (let day = 0; day < 8; day++) {
    stringArray[day] = new Array(24);
  }
  for (let day = 0; day < 8; day++) {
    for (let hour = 0; hour < stringArray[day].length; hour++) {
      if (hour === 0) {
        stringArray[day][hour] = daysOfWeek[day];
      }
      if (day === 0) {
        stringArray[day][hour] = hour;
      }
      // loop the data
      for (let k = 0; k < data.length; k++) {
        if (
          parseInt(data[k].dow) + 1 === day &&
          parseInt(data[k].hour) + 1 === hour
        ) {
          if (!stringArray[day][hour] || stringArray[day][hour] === 0) {
            stringArray[day][hour] = 1;
          } else {
            stringArray[day][hour]++;
          }
        } else {
          if (hour !== 0 && day !== 0) {
            stringArray[day][hour] = 0;
          }
        }
      }
    }
  }
  // console.log(stringArray.join(","));
  let result = ",";
  for (let x = 0; x < stringArray.length; x++) {
    for (let y = 0; y < stringArray[x].length; y++) {
      result = result.concat(stringArray[x][y]);
      if (y === stringArray[x].length - 1) {
        result = result.concat('\n');
      } else {
        result = result.concat(",");
      }
    }
  }
  // console.log(result);
  return result;
}

window.onload = function() {
  console.log(dataCSV);
  console.log(mockData);
  // 1 line = 1 row

  // console.log(dataCSV);
  var margin = { top: 10, right: 40, bottom: 10, left: 15 };
  var width = 960 - margin.left - margin.right;
  var height = 405 - margin.top - margin.bottom;
  var padding = 3;
  var xLabelHeight = 30;
  var yLabelWidth = 80;
  var borderWidth = 3;
  var duration = 500;

  var chart = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var border = chart
    .append("rect")
    .attr("x", yLabelWidth)
    .attr("y", xLabelHeight)
    .style("fill-opacity", 0)
    .style("stroke", "#000")
    .style("stroke-width", borderWidth)
    .style("shape-rendering", "crispEdges");

  function _load(dataCSV) {
    console.log("called load");
    // console.log(mode);
    var labelsX = null;
    var data = [];

    d3.csv.parseRows(dataCSV, function(d) {
      if (labelsX === null) return (labelsX = d.slice(1));

      var values = d.slice(1);
      var i = 0;

      for (; i < values.length; i++) {
        values[i] = parseInt(values[i], 10);
      }

      data.push({
        label: d[0],
        values: values
      });
    });

    update(data, labelsX);
  }

  function update(data, labelsX) {
    var allValues = Array.prototype.concat.apply(
      [],
      data.map(function(d) {
        return d.values;
      })
    );
    var maxWidth = d3.max(
      data.map(function(d) {
        return d.values.length;
      })
    );
    var maxR =
      d3.min([
        (width - yLabelWidth) / maxWidth,
        (height - xLabelHeight) / data.length
      ]) / 2;

    var r = function(d) {
      if (d === 0) return 0;

      f = d3.scale
        .sqrt()
        .domain([d3.min(allValues), d3.max(allValues)])
        .rangeRound([2, maxR - padding]);

      return f(d);
    };

    var c = d3.scale
      .linear()
      .domain([d3.min(allValues), d3.max(allValues)])
      .rangeRound([255 * 0.8, 0]);

    var rows = chart.selectAll(".row").data(data, function(d) {
      return d.label;
    });

    rows
      .enter()
      .append("g")
      .attr("class", "row");

    rows
      .exit()
      .transition()
      .duration(duration)
      .style("fill-opacity", 0)
      .remove();

    rows
      .transition()
      .duration(duration)
      .attr("transform", function(d, i) {
        return (
          "translate(" +
          yLabelWidth +
          "," +
          (maxR * i * 2 + maxR + xLabelHeight) +
          ")"
        );
      });

    var dots = rows.selectAll("circle").data(function(d) {
      return d.values;
    });

    dots
      .enter()
      .append("circle")
      .attr("cy", 0)
      .attr("r", 0)
      .style("fill", "#ffffff")
      .text(function(d) {
        return d;
      });

    dots
      .exit()
      .transition()
      .duration(duration)
      .attr("r", 0)
      .remove();

    dots
      .transition()
      .duration(duration)
      .attr("r", function(d) {
        return r(d);
      })
      .attr("cx", function(d, i) {
        return i * maxR * 2 + maxR;
      })
      .style("fill", function(d) {
        return "rgb(" + c(d) + "," + c(d) + "," + c(d) + ")";
      });

    var dotLabels = rows.selectAll(".dot-label").data(function(d) {
      return d.values;
    });

    var dotLabelEnter = dotLabels
      .enter()
      .append("g")
      .attr("class", "dot-label")
      .on("mouseover", function(d) {
        var selection = d3.select(this);
        selection
          .select("rect")
          .transition()
          .duration(100)
          .style("opacity", 1);
        selection
          .select("text")
          .transition()
          .duration(100)
          .style("opacity", 1);
      })
      .on("mouseout", function(d) {
        var selection = d3.select(this);
        selection
          .select("rect")
          .transition()
          .style("opacity", 0);
        selection
          .select("text")
          .transition()
          .style("opacity", 0);
      });

    dotLabelEnter
      .append("rect")
      .style("fill", "#000000")
      .style("opacity", 0);

    dotLabelEnter
      .append("text")
      .style("text-anchor", "middle")
      .style("fill", "#ffffff")
      .style("opacity", 0);

    dotLabels.exit().remove();

    dotLabels
      .attr("transform", function(d, i) {
        return "translate(" + i * maxR * 2 + "," + -maxR + ")";
      })
      .select("text")
      .text(function(d) {
        return d;
      })
      .attr("y", maxR + 4)
      .attr("x", maxR);

    dotLabels
      .select("rect")
      .attr("width", maxR * 2)
      .attr("height", maxR * 2);

    var xLabels = chart.selectAll(".xLabel").data(labelsX);

    xLabels
      .enter()
      .append("text")
      .attr("y", xLabelHeight)
      .attr("transform", "translate(0,-6)")
      .attr("class", "xLabel")
      .style("text-anchor", "middle")
      .style("fill-opacity", 0);

    xLabels
      .exit()
      .transition()
      .duration(duration)
      .style("fill-opacity", 0)
      .remove();

    xLabels
      .transition()
      .text(function(d) {
        return d;
      })
      .duration(duration)
      .attr("x", function(d, i) {
        return maxR * i * 2 + maxR + yLabelWidth;
      })
      .style("fill-opacity", 1);

    var yLabels = chart.selectAll(".yLabel").data(data, function(d) {
      return d.label;
    });

    yLabels
      .enter()
      .append("text")
      .text(function(d) {
        return d.label;
      })
      .attr("x", yLabelWidth)
      .attr("class", "yLabel")
      .style("text-anchor", "end")
      .style("fill-opacity", 0);

    yLabels
      .exit()
      .transition()
      .duration(duration)
      .style("fill-opacity", 0)
      .remove();

    yLabels
      .transition()
      .duration(duration)
      .attr("y", function(d, i) {
        return maxR * i * 2 + maxR + xLabelHeight;
      })
      .attr("transform", "translate(-6," + maxR / 2.5 + ")")
      .style("fill-opacity", 1);

    var vert = chart.selectAll(".vert").data(labelsX);

    vert
      .enter()
      .append("line")
      .attr("class", "vert")
      .attr("y1", xLabelHeight + borderWidth / 2)
      .attr("stroke", "#888")
      .attr("stroke-width", 1)
      .style("shape-rendering", "crispEdges")
      .style("stroke-opacity", 0);

    vert
      .exit()
      .transition()
      .duration(duration)
      .style("stroke-opacity", 0)
      .remove();

    vert
      .transition()
      .duration(duration)
      .attr("x1", function(d, i) {
        return maxR * i * 2 + yLabelWidth;
      })
      .attr("x2", function(d, i) {
        return maxR * i * 2 + yLabelWidth;
      })
      .attr("y2", maxR * 2 * data.length + xLabelHeight - borderWidth / 2)
      .style("stroke-opacity", function(d, i) {
        return i ? 1 : 0;
      });

    var horiz = chart.selectAll(".horiz").data(data, function(d) {
      return d.label;
    });

    horiz
      .enter()
      .append("line")
      .attr("class", "horiz")
      .attr("x1", yLabelWidth + borderWidth / 2)
      .attr("stroke", "#888")
      .attr("stroke-width", 1)
      .style("shape-rendering", "crispEdges")
      .style("stroke-opacity", 0);

    horiz
      .exit()
      .transition()
      .duration(duration)
      .style("stroke-opacity", 0)
      .remove();

    horiz
      .transition()
      .duration(duration)
      .attr("x2", maxR * 2 * labelsX.length + yLabelWidth - borderWidth / 2)
      .attr("y1", function(d, i) {
        return i * maxR * 2 + xLabelHeight;
      })
      .attr("y2", function(d, i) {
        return i * maxR * 2 + xLabelHeight;
      })
      .style("stroke-opacity", function(d, i) {
        return i ? 1 : 0;
      });

    border
      .transition()
      .duration(duration)
      .attr("width", maxR * 2 * labelsX.length)
      .attr("height", maxR * 2 * data.length);
    // _load(dataCSV, "view.js");
  }

  _load(dataCSV);
};
