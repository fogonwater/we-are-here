function color(n) {
    if (n <= 2) {
        return '#888'
    }
    if (n <= 5) {
        return '#444'
    }
    return '#000'
}

const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    bar_length = d3.scaleLinear().range([2.75, 27]).domain([1, 40]),
    bar_width = d3.scaleLinear().range([.8, 8]).domain([1, 40]),
    opac = d3.scaleLinear().range([.4, 1]).domain([1, 40]),
    parseDate = d3.timeParse("%Y %m %d")

const ox = width / 2,
    oy = height / 2,
    sf = 19

// add background rect for consistent export resolution
svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .style('fill', 'whitesmoke')

const g = svg.append("g")
//.attr("transform", 'rotate( 180, ' + ox +', ' + oy +')')

var src = 'data/wellington_2014_baring_head.csv',
    title = 'wellington 2014'
//var src = 'data/auckland_2014.csv', title = 'auckland 2014'
//var src = 'data/gisborne_2014.csv', title = 'gisborne 2014'
//var src = 'data/new_plymouth_awakino_2014.csv', title = 'awakino 2014'
//var src = 'data/new_plymouth_stratford_2014.csv', title = 'stratford 2014'
//var src = 'data/greymouth_2014.csv', title = 'greymouth 2014'
//var src = 'data/christchurch_2014.csv', title = 'christchurch 2014'
//var src = 'data/invercargill_2014.csv', title = 'invercargill 2014'
//var src = 'data/dunedin_2014.csv', title = 'dunedin 2014'
//var src = 'data/blenheim_2014.csv', title = 'blenheim 2014'
//var src = 'data/akitio_2014.csv', title = 'akitio 2014'


// Get the data from our CSV file
d3.csv(src, function (error, data) {

    if (error) throw error;

    data.forEach(function (d) {
        d.speed = round(+d['Speed(m/s)'], 1)
        //d.speed = round( +d['Speed(km/hr)'], 1)
        //d.speed = +d['Speed(m/s)']
        d.dir = round(+d['Dir(DegT)'], 1)
        d.bucket = d.speed + ':' + d.dir
    })

    var nest = d3.nest()
        .key((d) => d.bucket)
        .rollup((leaves) => {
            return {
                count: leaves.length,
                dir: leaves[0].dir,
                speed: leaves[0].speed,
            }
        })
        .entries(data)

    var wind_buckets = nest.map((a) => a.value)

    const bars = g.selectAll('.bars')
        .data(wind_buckets)
        .enter().append('rect')
        .attr('x', (d) => ox + (Math.sin(Math.radians(d.dir % 360)) * d.speed * sf))
        .attr('y', (d) => oy - (Math.cos(Math.radians(d.dir % 360)) * d.speed * sf))
        .attr('width', (d) => bar_width(d.speed))
        .attr('height', (d) => bar_length(d.speed))
        .attr("transform", (d) => compose_rotate(d))
        //.style('fill', '#0a0a0a')
        .style('fill', (d) => color(d.count))

    svg.append("text")
        .text(title)
        .attr("x", 10)
        .attr("y", 40)
        .attr("class", "title")
    svg.append("text")
        .text('Max count: ' + d3.max(wind_buckets, (d) => d.count))
        .attr("x", 10)
        .attr("y", 60)
        .attr("class", "title")
    svg.append("text")
        .text('Max speed: ' + d3.max(wind_buckets, (d) => d.speed))
        .attr("x", 10)
        .attr("y", 80)
        .attr("class", "title")

    document.title = title

});


Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
}

function compose_rotate(d) {
    x1 = ox + (Math.sin(Math.radians(d.dir % 360)) * d.speed * sf)
    y2 = oy - (Math.cos(Math.radians(d.dir % 360)) * d.speed * sf)
    w = bar_width(d.speed)
    h = bar_length(d.speed)
    return 'rotate( ' + d.dir + ', ' + (w / 2 + x1) + ', ' + (h / 2 + y2) + ')'
}

function round(x, n) {
    return Math.round(x / n) * n;
}