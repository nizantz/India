var width = 2000,
	height = 1160;
	var svg = d3.select("body").append("svg")
	.attr("width",width)
	.attr("height",height);


d3.json("data/india1.json", function(err, data) {
//	if (err) return console.error(err);

  var IND1 = topojson.feature(data, data.objects.IND1);
  var projection = d3.geo.mercator().scale(500).translate([width / 2, height / 2]);
  /*var projection = d3.geo.albers()
  .rotate([275, 0])
  .center([50, 0])
  .parallels([0, 12])
  .scale(700)
  .translate([width / 2, height / 2]);
  */
  var path = d3.geo.path().projection(projection);
  
  svg.append("path")
     .datum(IND1)
     .attr("d",path);

  svg.selectAll(".IND1")
    .data(topojson.feature(data, data.objects.IND1).features)
    .enter().append("path")
    .attr("class", function(d) { return "IND1 " + d.id; })
    .attr("d", path);


  svg.append("path")
    .datum(topojson.feature(data, data.objects.places))
    .attr("d", path)
    .attr("class", "place");

 svg.selectAll(".place-label")
    .data(topojson.feature(data, data.objects.places).features)
    .enter().append("text")
    .attr("class", "place-label")
    .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
    .attr("dy", ".1em")
    .text(function(d) { return d.properties.name; });
  
  svg.selectAll(".place-label")
    .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
    .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

    });
    