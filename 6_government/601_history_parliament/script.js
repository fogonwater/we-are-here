var year_markers = [1900, 1950, 2000],
    colors = {
        'Conservative': '#b4c8d2',
        'Liberal': '#ffd97c',
        'United': '#b5e4fa',
        'Reform': '#8dcabe',
        'National': '#2e95b6',
        'Labour': '#f15c4c',
        'Others': '#cdcdcd',
        'Independent': '#9da29d',
        'NZ First': '#3d3f43',
        'Alliance': '#94ca5f',
        'Green': '#61bf84',
        'Act': '#fdb92d',
        'United NZ': '#846db1',
        'United Labour': '#bf483b',
        'Social Democrats': '#e08b65',
        'Labour 1910': '#be3132',
        'Maori': '#7d584a',
        'Progressive': '#be3132',
        'NewLabour': '#be3132',
        'Mana': '#884444',
        'Social Credit': '#ffd97c'
    },
    //interpolate_type = 'basis';
    interpolate_type = 'monotone';

var sf = 2,
    margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    width = (2600) - margin.left - margin.right,
    height = (800) - margin.top - margin.bottom;

var q = d3_queue.queue()
    .defer(d3.json, 'data/parliament_stream_data.json')
    .defer(d3.json, 'data/election_years.json')
    .defer(d3.csv, 'data/nz_political_eras.csv')
    .defer(d3.csv, 'data/nz_governments.csv')
    .await(visualize);

var n = 13, // number of layers
    m = 150, // number of samples per layer
    stack = d3.layout
    .stack()
    //.order('inside-out')
    .offset("silhouette");

var x = d3.scale.linear()
    .domain([1850, 2019])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, 150])
    .range([height, 0]);

var area = d3.svg.area()
    .interpolate(interpolate_type)
    .x(function (d) {
        return x(d.x);
    })
    .y0(function (d) {
        return y(d.y0);
    })
    .y1(function (d) {
        return y(d.y0 + d.y);
    });

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function visualize(errors, data, election_years, eras, nz_governments) {
    eras.forEach(function (d) {
        d.start_year = +d.start_year;
        d.end_year = +d.end_year + 1;
    });
    nz_governments.forEach(function (d) {
        d.start_year = +d.start_year;
        d.end_year = +d.end_year + 0.5;
    });

    var historical = svg.selectAll("hist")
        .data(election_years)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return x(d);
        })
        .attr("y1", 80) // y position of the first end of the line
        .attr("x2", function (d) {
            return x(d);
        })
        .attr("y2", height)
        .attr("class", "election-markers");

    var yearLabels = svg.selectAll("yearLabels")
        .data(election_years)
        .attr("transform", "translate(0," + height + ")")
        .enter()
        .append("text")
        .attr("x", function (d) {
            return x(d);
        })
        .attr("y", 80)
        .text(function (d) {
            return d;
        })
        //.text(function(d) { return "'" + d.toString().substr(2,3); })
        .attr("class", "year-label");


    var areas = svg.selectAll("areas")
        .data(stack(data))
        .enter().append("path")
        .attr("d", area)
        .style("stroke", 'white')
        .style("stroke-width", 0.5)
        .style("fill", function (d) {
            return colors[d[0].party];
        });

    var toolTip = svg.selectAll("path")
        .append("svg:title")
        .text(function (d) {
            return d[0].party;
        });

    svg.selectAll("eras")
        .data(eras)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return x(d.start_year);
        })
        .attr("y1", 50) // y position of the first end of the line
        .attr("x2", function (d) {
            return x(d.end_year);
        })
        .attr("y2", 50)
        .attr("class", "era");

    svg.selectAll("era-labels")
        .data(eras)
        .enter()
        .append("text")
        .attr("x", function (d) {
            return x((d.end_year - d.start_year) / 2 + d.start_year);
        })
        .attr("y", 55)
        .text(function (d) {
            console.log(d)
            return d.label;
        })
        .attr("class", "era-label");

    svg.selectAll("govts")
        .data(nz_governments)
        .enter()
        .append("line")
        .attr("x1", function (d) {
            return x(d.start_year);
        })
        .attr("y1", 50) // y position of the first end of the line
        .attr("x2", function (d) {
            return x(d.end_year);
        })
        .attr("y2", 50)
        .attr("class", "era");

    svg.selectAll("govts-labels")
        .data(nz_governments)
        .enter()
        .append("text")
        .attr("x", function (d) {
            return x((d.end_year - d.start_year) / 2 + d.start_year);
        })
        .attr("y", 55)
        .text(function (d) {
            console.log(d)
            return d.label;
        })
        .attr("class", "era-label");
}