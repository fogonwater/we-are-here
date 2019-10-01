const bar_width = 30,
    bar_clamp = 0, //3,
    bar_height = 14,
    vert_text_offset = -4,
    vert_num_offset = 10

const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    margin = 20

// Set up some scales
const x = d3.scaleLinear()
    .range([margin, width - margin])
    .domain([1890, 2020]),
    y = d3.scaleLinear()
    .range([margin, height - margin])
    .domain([0, 31]),
    color = d3.scaleSequential(d3.interpolateRdPu)
    .domain([31, 0]),
    formatNumber = d3.format(",.0f")

const line = d3.line()
    .curve(d3.curveBasis)
    //.curve(d3.curveLinear)
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    })

// Load our external data
d3.csv("data/long_cities.csv", function (data) {

    let earliest = {}

    data.forEach(function (d) {
        d.name = d.City
        d.count = +d.count
        d.rank = +d.rank
        d.year = +d.year
        if (isNaN(d.count)) {
            d.count = 0.1
            d.rank = 31
        } else if (!(d.name in earliest)) {
            earliest[d.name] = d.rank
        }
    })

    data.sort(function (a, b) {
        return d3.ascending(a.year, b.year) || d3.descending(a.count, b.count)
    })

    lines = buildLines(data)
    svg.selectAll(".paths")
        .data(lines)
        .enter().append("path")
        .style("fill", (d) => color(earliest[d[0].name]))
        .attr("d", line)

    svg.selectAll(".name_labels")
        .data(data)
        .enter().append("text")
        .attr("x", (d) => x(d.year) - (bar_width * 0.5))
        .attr("y", (d) => y(d.rank) + vert_text_offset)
        .text((d) => d.name)
        .attr('text-anchor', 'start')
        .style("fill", (d) => '#eee') //color(earliest[d.name]))

    svg.selectAll(".number_labels")
        .data(data)
        .enter().append("text")
        .attr("x", (d) => x(d.year) - (bar_width * 0.5))
        .attr("y", (d) => y(d.rank) + vert_num_offset)
        .text((d) => formatNumber(Math.round(d.count / 10) * 10))
        .attr('text-anchor', 'start')
        .style("fill", (d) => '#eee') //color(earliest[d.name]))
})

function buildLines(data) {
    const nest = d3.nest()
        .key(function (d) {
            return d['name'];
        })
        .rollup(function (leaves) {
            return {
                'count': leaves.length,
                'leaves': leaves
            };
        })
        .entries(data)

    let report = []

    d3.values(nest).sort().forEach(function (d) {
        var upper = [],
            lower = []
        d.value.leaves.forEach(function (v) {
            bar_left = x(v.year) - (bar_width * 0.5)
            bar_right = x(v.year) + (bar_width * 0.5)
            upper.push({
                'x': bar_left - bar_clamp,
                'y': y(v.rank) - bar_height,
                'name': v.name,
                'rank': v.rank
            })
            upper.push({
                'x': bar_left,
                'y': y(v.rank) - bar_height,
                'name': v.name,
                'rank': v.rank
            })
            upper.push({
                'x': bar_right,
                'y': y(v.rank) - bar_height,
                'name': v.name,
                'rank': v.rank
            })
            upper.push({
                'x': bar_right + bar_clamp,
                'y': y(v.rank) - bar_height,
                'name': v.name,
                'rank': v.rank
            })
            lower.push({
                'x': bar_left - bar_clamp,
                'y': y(v.rank) + bar_height,
                'name': v.name,
                'rank': v.rank
            })
            lower.push({
                'x': bar_left,
                'y': y(v.rank) + bar_height,
                'name': v.name,
                'rank': v.rank
            })
            lower.push({
                'x': bar_right,
                'y': y(v.rank) + bar_height,
                'name': v.name,
                'rank': v.rank
            })
            lower.push({
                'x': bar_right + bar_clamp,
                'y': y(v.rank) + bar_height,
                'name': v.name,
                'rank': v.rank
            })
        })
        lower.reverse()
        report.push(upper.concat(lower))
    })
    return report
}