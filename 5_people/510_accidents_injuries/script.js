// this uses d3-jetpack. https://github.com/gka/d3-jetpack
//should probably rewrite in vanilla d3

// map d3.f to ƒ as per convenience convention
var ƒ = d3.f

// ages are in 5 year increments starting 0-5 up to 85+
var c = d3.conventions({
        parentSel: d3.select('#chart'),
        width: 1290,
        height: 716
    }),
    draw_circles = true,
    draw_text = true,
    show_codes = true;

var q = d3.queue()
    .defer(d3.json, 'data/hospitalisation_injury.json')
    .defer(d3.json, 'data/labels.json')
    .await(visualize);

function visualize(errors, data, labels) {

    data.sort(function (x, y) {
        return d3.descending(x.count, y.count);
    })

    maxCount = Math.max.apply(
        Math, data.map(function (o) {
            return o.count;
        }) //get maximum count value
    );

    var sizescale = d3.scaleLinear()
        .domain([1, maxCount])
        .range([1.5, 50]);

    // controls the x positions for the circles
    var xscale = d3.scaleLinear()
        .domain(d3.extent(data, ƒ('x')))
        .range([300, c.width - 100]) // change range() array values to screen pixels

    c.y.domain(d3.extent(data, ƒ('y'))).nice();

    var color = d3.scaleSequential(d3.interpolateViridis)
        .domain(d3.extent(data, ƒ('x')).reverse());

    if (draw_circles) {
        c.svg.appendMany(data, "circle.dot")
            .attr("r", ƒ('count', sizescale))
            .attr("cx", ƒ('x', xscale))
            .attr("cy", ƒ('y', c.y))
            .style("fill", "steelblue")
            .style("stroke", "white")
            .style("fill", ƒ('x', color))
            .call(d3.attachTooltip);
    }

    if (draw_text) {
        // render the text labels
        c.svg.appendMany(labels, "text")
            .text(function (d) {
                if (!show_codes) {
                    return d.name.slice(8, d.name.length);
                } else {
                    return d.name;
                }
            })
            .attr("y", ƒ('y', c.y))
            .attr("x", 0)
            .style("font-size", "9.5px")
            .attr("dominant-baseline", "central")
    }
}