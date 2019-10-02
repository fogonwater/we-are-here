const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    margin = 20

// Set up some scales
const x = d3.scaleLinear().range([margin, width - margin]),
    y = d3.scaleLinear().range([height - margin, margin]),
    parseDate = d3.timeParse("%d %b %Y"),
    earliestDate = parseDate("01 Jul 2006"),
    stages = {
        discharged: 1.,
        introduction: 1,
        negatived: 1.,
        first_reading: 2,
        submissions_due: 3,
        sc_report: 4,
        second_reading: 5,
        whole_house: 6,
        third_reading: 7,
        royal_assent: 8,
    }

/*
// scaling for controlling colour saturation by time
const shader = d3.scaleLinear().range([0, 3])
  .domain([parseDate('8 Nov 2008'), parseDate('31 Oct 2018')])
  .clamp(true)
*/

const q = d3
    .queue()
    .defer(d3.json, 'data/bill_events.json')
    .await(visualize)

function color(d) {
    let col = 'black'
    if (d.bill_type == 'Government') {
        if (d.date > parseDate("8 Nov 2008") && d.date < parseDate("23 Sep 2017")) {
            col = 'steelblue'
        } else {
            col = 'red'
        }

    } else if (d.bill_type == "Member's") {
        col = 'green'
    } else if (d.bill_type == "Local") {
        col = 'orange'
    } else if (d.bill_type == "Private") {
        col = 'purple'
    }
    return col
    //return chroma(col).saturate(shader(d.date))
}

function should_display(s) {
    //if ( s == null ) { return false}
    //if ( s.indexOf("132-3" ) !== -1) {return true}
    if (s == 'Government') {
        return true
    }
    //if ( s === "39-2" ) {return true}
    return false
}

// Load our external data
function visualize(errors, raw_data) {
    var events = [],
        paths = [],
        rank = 0,
        offset = 0;

    // perform an initial sorting
    let data = []

    raw_data.forEach(function (d) {
        //if (d.bill_type == 'Government') {d.sort = 0}
        //else {d.sort = 1}
        if (d.events.length > 1) {
            d.start_date = parseDate(d.events[0].value)
            data.push(d)
        }

    })
    

    data.sort(function (a, b) {
        return d3.ascending(a.start_date, b.start_date)
    })

    data.forEach(function (d) {
        //if (should_display(d.bill_type) != true) {return}
        if (should_display(d.bill_id) != true) {
            return
        }
        console.log(d)

        seq = [];

        d.events.forEach(function (ev, i) {
            rank = stages[ev.key]
            dt = parseDate(ev.value)
            if (d.events[d.events.length - 1].key == 'royal_assent') {
                is_end_node = false
            } else if (i == d.events.length - 1) {
                is_end_node = true
            } else {
                is_end_node = false
            }
            if (dt >= earliestDate) {
                events.push({
                    date: dt,
                    rank: rank,
                    bill_id: d.bill_id,
                    bill_type: d.bill_type,
                    bill_title: d.bill_title,
                    is_end_node: is_end_node
                })
                // sequence will get used for drawing lines
                // not adding negatived events so lines just stop... need better approach
                if (ev.key != 'negatived') {
                    seq.push({
                        date: dt,
                        rank: rank,
                        stage: ev.key
                    })
                }
            }
        });

        // assemble the paths from the event sequences
        if (seq.length >= 2) {
            seq.sort(function (x, y) {
                return d3.ascending(x.date, y.date);
            });
            seq[0].bill_id = d.bill_id;
            seq[0].bill_type = d.bill_type;
            seq[0].bill_title = d.bill_title;
            seq[0].member = d.member;
            paths.push(seq);
        }

    })

    //data.sort(function(a, b){ return d3.descending(a.val1, b.val1) })

    x.domain(d3.extent(events, d => d.date))
    y.domain([.5, 8])

    //console.log(d3.extent(events, d => d.date))

    var line = d3.line()
        .curve(d3.curveMonotoneX)
        .x(d => x(d.date))
        .y(d => y(d.rank))
    //console.log(paths)

    svg
        .selectAll("bills")
        .data(paths)
        .enter()
        .append("path")
        .attr("d", d => line(d))
        .attr("opacity", ".8")
        .attr("fill", "none")
        .attr("stroke-width", 1.2)
        .attr("stroke", d => color(d[0]))


    // draw year lines-
    var years = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        year_lines = [];
    years.forEach(function (d) {
        xpos = y(parseDate("01 Jan " + d));
        year_lines.push([{
                date: parseDate("01 Jan " + d),
                rank: 0,
                election: false
            },
            {
                date: parseDate("01 Jan " + d),
                rank: 0.5
            }
        ]);
    });
    // draw the election lines
    ["8 Nov 2008", "26 Nov 2011", "20 Sep 2014", "23 Sep 2017"].forEach(function (d) {
        year_lines.push([{
                date: parseDate(d),
                rank: 0,
                election: true
            },
            {
                date: parseDate(d),
                rank: 0.5
            }
        ]);
    });

    svg
        .selectAll("years")
        .data(year_lines)
        .enter()
        .append("path")
        .attr("d", d => line(d))
        .attr("opacity", "1")
        .attr("fill", "none")
        .attr("class", "dashed")
        .attr("stroke", function (d) {
            if (d[0].election) {
                return "red";
            }
            return "black";
        })
        .attr("stroke-width", 2);

}