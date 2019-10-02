var q = d3
    .queue()
    .defer(d3.json, 'http://enjalot.github.io/wwsd/data/world/world-110m.geojson')
    .defer(d3.json, 'data/cables.geojson')
    .defer(d3.json, 'data/landings.geojson')
    .await(visualize);

var sf = 4.2,
    zf = 1.42,
    width = 235 * sf,
    height = 290 * sf;

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    

/*var projection = d3.geoMercator()
    .scale(width / 2 / Math.PI)
    //.scale(100)
    .translate([width / 2, height / 2])*/

var map_center = [190, 40],//41.2865° S, 174.7762
    //projection = d3.geoAzimuthalEqualArea()
    projection = d3.geoAzimuthalEquidistant()
    //projection = d3.geoAiry()
        .scale(220 * zf)
        .translate([width / 2, height / 2])
        .rotate(map_center)
        .precision(0.1);

var geoPath = d3.geoPath()
    .projection(projection);

function visualize(errors, countries, cables, landings) {
    console.log(cables)

    svg.append("path")
        .datum({type: "Sphere"})
        .attr("id", "sphere")
        .style("fill", "#fff")
        .attr("d", geoPath);
    /*
    svg.append("path")
        .datum(d3.geoGraticule10())
        .style("fill", "none")
        .style("stroke", "#777")
        .style("stroke-width", 0.5)
        .style("stroke-opacity", 0.5)
        .attr("d", geoPath);
    */
    /* */
    svg.append("path")
        .attr("d", geoPath(countries))
        .style("stroke", "#555")
        .style("stroke-width", 0.25)
        .style("fill", "#777")
    
    svg.selectAll("cables")
            .data(cables.features)
        .enter()
            .append("path")
            .attr("d", geoPath)
            .style("stroke", function(d) {return 'crimson'})//d.properties.color})
            .style("stroke-width", 1)
            .style("fill", "none");
    

    svg.selectAll("landings")
            .data(landings.features)
        .enter()
            .append("path")
            .attr("d", geoPath)
            .attr('d', geoPath.pointRadius(1.7))
            .style("fill", "#444");
}