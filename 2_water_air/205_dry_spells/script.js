let f_name = ''
f_name = '00_Far_North_District.csv'
f_name = '11_Waikato_District.csv'
f_name = '13_Taupo_District.csv'
f_name = '21_Gisborne_District_East.csv'
f_name = '23_Hastings_District_West.csv'
f_name = '30_South_Taranaki_District.csv'
f_name = '34_Manawatu_District.csv'
f_name = '43_Masterton_District.csv'
f_name = '48_Nelson_City.csv'
f_name = '52_Grey_District_West.csv'
f_name = '63_Christchurch_City.csv'
f_name = '67_Mackenzie_District.csv'
f_name = '74_Central_Otago_District.csv'
f_name = '79_Gore_District.csv'
f_name = '82_Stewart_Island.csv'

document.title = f_name.replace('.csv', '')

const start_year = 2008,
    end_year = 2019,
    start = moment(start_year + "-07-01"),
    end = moment(end_year + "-07-01"),
    num_days = end.diff(start, "days") - 1

console.log(start._i)
console.log(end._i)

// set the dimensions and margins of the graph
const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    ymargin = 0

const color = d3.scaleSequential(d3.interpolateYlOrBr)
    .domain([0, 1.75])

// parse the date / time
const parseTime = d3.timeParse("%Y-%m-%d");

// set the ranges
const x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear()
    .range([height - ymargin, 0])
    .domain([0.4, 2.2]),
    gradientY = d3.scaleLinear()
    .range([0, 100])
    .domain([y.domain()[0], y.domain()[1]])

const years = d3.range(start_year, end_year + 1).map(function (d) {
    return parseTime(d + '-01-01')
})

const area = d3.area()
    .x(function (d) {
        return x(d.date);
    })
    .y0(height)
    .y1(function (d) {
        return y(d.value);
    });

// Get the data
d3.csv("data/" + f_name, function (error, raw) {
    var data = []

    // format the data
    raw.forEach(function (d) {
        if (d.NZDI_INDICATOR == 'NZDI') {
            if (moment(d.OBS_DATE) >= start && moment(d.OBS_DATE) < end) {
                d.date = parseTime(d.OBS_DATE)
                if (+d.VAL > y.domain()[0]) {
                    d.value = +d.VAL
                } else {
                    d.value = y.domain()[0]
                }

                data.push(d)
            }
        }
    })

    // Scale the range of the data
    x.domain([start, end])

    function calcPercent(n) {
        return parseInt(gradientY(n)) + '%'
        //return parseInt(n / y.domain()[1] * 100) + '%'
    }

    console.log(calcPercent(.75))
    console.log(calcPercent(1.75))

    // set the gradient
    svg.append("linearGradient")
        .attr("id", "stepped-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", height)
        .attr("x2", 0).attr("y2", 0)
        .selectAll("stop")
        .data([{
                offset: "0%",
                color: color(0.00)
            },
            {
                offset: calcPercent(0.749),
                color: color(0.46)
            },
            {
                offset: calcPercent(0.750),
                color: color(0.60)
            },
            {
                offset: calcPercent(0.999),
                color: color(0.75)
            },
            {
                offset: calcPercent(1.000),
                color: color(0.88)
            },
            {
                offset: calcPercent(1.249),
                color: color(1.00)
            },
            {
                offset: calcPercent(1.250),
                color: color(1.13)
            },
            {
                offset: calcPercent(1.499),
                color: color(1.25)
            },
            {
                offset: calcPercent(1.500),
                color: color(1.38)
            },
            {
                offset: calcPercent(1.749),
                color: color(1.50)
            },
            {
                offset: calcPercent(1.750),
                color: color(1.75)
            },
            {
                offset: "100%",
                color: color(1.75)
            }
        ])
        .enter().append("stop")
        .attr("offset", function (d) {
            return d.offset;
        })
        .attr("stop-color", function (d) {
            return d.color;
        })

    // set the gradient
    svg.append("linearGradient")
        .attr("id", "continuous-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", height)
        .attr("x2", 0).attr("y2", 0)
        .selectAll("stop")
        .data([{
                offset: "0%",
                color: color(0.00)
            },
            {
                offset: calcPercent(0.54),
                color: color(0.42)
            },
            {
                offset: calcPercent(0.75),
                color: color(0.75)
            },
            {
                offset: calcPercent(1.00),
                color: color(1.00)
            },
            {
                offset: calcPercent(1.25),
                color: color(1.25)
            },
            {
                offset: calcPercent(1.50),
                color: color(1.50)
            },
            {
                offset: calcPercent(1.75),
                color: color(1.75)
            },
            {
                offset: "100%",
                color: color(1.75)
            }
        ])
        .enter().append("stop")
        .attr("offset", function (d) {
            return d.offset;
        })
        .attr("stop-color", function (d) {
            return d.color;
        })

    // Add the area.
    svg.append("path")
        .data([data])
        .attr("class", "area")
        .attr("d", area)
        .style("fill", "url(#stepped-gradient)")

    svg.selectAll("years")
        .data(years)
        .enter().append("line")
        .attr("x1", function (d) {
            return x(d)
        })
        .attr("y1", 0)
        .attr("x2", function (d) {
            return x(d)
        })
        .attr("y2", height - ymargin)
        .style("fill", "none")
        .style("stroke", '#acacac')
        .style("stroke-width", .69)

    raw = null
});