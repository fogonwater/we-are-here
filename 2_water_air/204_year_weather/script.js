var station = '18183',
    station_name = 'Kaitaia'
    //var station = '1962',   station_name='Auckland'
    //var station =  '24976', station_name='Gisborne'
    //var station = '2283',   station_name='New Plymouth'
    //var station = '3445',   station_name='Wellington'
    //var station = '4271',   station_name='Nelson'
    //var station = '24120',  station_name='Christchurch'
    //var station = '5451',   station_name='Queenstown'
    //var station = '11104',  station_name='Invercargill'

document.title = station_name + '_weather_2014_15'

const rain_circle_pos = -10,
    rain_threshold = 2,
    max_rain_symbol = 15,
    max_rain_value = 200,
    axes_color = '#e0e0e0'

// set the dimensions and margins of the graph
const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    origin = svg.append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')rotate(5)')

const interval = 20,
    low_val = -60,
    high_val = 30,
    thresholds = d3.range(low_val, high_val, interval)

const angle = d3.scaleLinear()
    .domain([0, 375])
    .range([0, 360]),
    r = d3.scaleLinear()
    .domain([low_val, high_val])
    .range([0, height / 2]),
    x = (dayofyear, val) => // TODO - remove parseInt()?
    Math.sin(angle(dayofyear) * Math.PI / 180) * r(parseInt(val)),
    y = (dayofyear, val) =>
    -Math.cos(angle(dayofyear) * Math.PI / 180) * r(parseInt(val)),
    mm = d3.scaleLinear()
    .domain([2, 100])
    .range([1, max_rain_symbol]),
    parseTime = d3.timeParse("%Y %b %d")

function color(n) {
    if (+n < 0) {
        return chroma('#4575b4').darken()
    }
    if (+n < 5) {
        return '#4575b4'
    }
    if (+n < 10) {
        return '#91bfdb'
    }
    if (+n < 15) {
        return '#e0f3f8'
    }
    if (+n < 20) {
        return '#fee090'
    }
    if (+n < 25) {
        return '#fc8d59'
    }
    if (+n < 30) {
        return '#d73027'
    }
    return 'black'
}

origin.selectAll('circle.axis-white')
    .data(thresholds.filter((d) => d >= 0))
    .enter().append('circle')
    .attr('r', (d) => r(d))
    .style('fill', 'none')
    .style('stroke', axes_color)
    .style('stroke-width', 0.7)

const q = d3
    .queue()
    .defer(d3.csv, 'data/stations.csv')
    .await(visualize)

function visualize(errors, data) {
    data = data.filter((d) => +d.Station == station)

    const date0 = parseTime(data[0]['Day(Local_Date)'])
    console.log(date0)

    data.forEach(function (d) {
        d.date = parseTime(d['Day(Local_Date)'])
        d.tmin = +d['Tmin(C)']
        d.tmax = +d['Tmax(C)']
        d.tmean = +d['Tmean(C)']
        d.mm = +d['Rain(mm)']
        d.day = daysBetween(date0, d.date)
    })

    // prepare the month spokes
    const month_names = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    var months = []

    // draw the month spokes
    data.forEach(function (d) {
        if (d.date.getDate() === 1) {
            month_name = month_names[d.date.getMonth()]
            months.push({
                day: d.day,
                month: month_name
            })
        }
    })

    // ensure data is sorted by day in ascending order
    data.sort((a, b) => a.day - b.day)

    // add in the final month spoke
    months.push({
        day: data[data.length - 1].day,
        month: ''
    })

    origin.selectAll(".months")
        .data(months)
        .enter().append("line")
        .attr("x1", (d) => x(d.day, 0))
        .attr("y1", (d) => y(d.day, 0))
        .attr("x2", (d) => x(d.day, 20))
        .attr("y2", (d) => y(d.day, 20))
        .style('stroke', axes_color)
        .style('stroke-width', 1)

    // Add the labels
    // x & y are inverted to handle rotation about origin
    origin.selectAll(".monthlabels")
        .data(months)
        .enter().append("text")
        .attr("x", (d) => -x(d.day + 15, 30))
        .attr("y", (d) => -y(d.day + 15, 30))
        .text((d) => d.month)
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-185)")
        .style('fill', '#aaa')


    // prepare arc generator and the temperature arc mappings
    const arc = d3.arc(),
        temp_arcs = data.map(function (d) {
            return {
                startAngle: deg2rad(angle(d.day)), // working in degrees
                endAngle: deg2rad(angle(d.day + 1)),
                innerRadius: r(d.tmin),
                outerRadius: r(d.tmax),
                col: color(Math.round(d.tmean)),
                tmin: d.tmin
            }
        })

    // draw rain circles
    var rain_circles = data.filter((d) => d.mm >= rain_threshold && d.mm > 0)
    rain_circles.sort((a, b) => b.mm - a.mm)

    origin.selectAll(".circles")
        .data(rain_circles)
        .enter().append("circle")
        .attr("cx", (d) => x(d.day, rain_circle_pos)) //d.tmax + 0.5) )
        .attr("cy", (d) => y(d.day, rain_circle_pos)) //d.tmax + 0.5) )
        .attr("r", (d) => mm(d.mm))
        .style('fill', 'steelblue')
        .style('stroke', chroma('steelblue'))
        .style('opacity', 0.45)
        .append("svg:title")
        .text((d) => d.mm + 'mm')

    // draw temperature spikes -- TODO sort so low temps on top?
    temp_arcs.sort((a, b) => b.tmin - a.tmin)
    origin.selectAll(".temp_arcs")
        .data(temp_arcs)
        .enter().append("path")
        .attr("d", arc)
        .style("fill", (d) => d.col)
        .style("stroke-width", 0.7)
        //.style("stroke", 'white')
        .style("stroke", (d) => chroma(d.col).darken(0.5))



}
// end visualize() function

//
// helper functions
//
function alt_mm(val) {
    //var max_radius = 30, max_value = 14;
    return Math.sqrt(val / max_rain_value) * max_rain_symbol;
}

function daysBetween(date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
}


function deg2rad(degrees) {
    return degrees * (Math.PI / 180)
}