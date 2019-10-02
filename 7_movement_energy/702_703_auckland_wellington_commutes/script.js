ƒ = d3.f

//var place = 'auckland',
var place = 'wellington',
    mapFrames = {
        'auckland': {
            'x0': 1722809,
            'y0': 5878098,
            'x1': 1842809,
            'y1': 5950598
        },
        'wellington': {
            'x0': 1725331,
            'y0': 5417894,
            'x1': 1845331,
            'y1': 5490394
        }
    },
    extent = mapFrames[place],
    drawLines = true,
    drawCircles = true

var q = d3.queue()
    .defer(d3.json, 'data/nodes.json')
    .defer(d3.json, 'data/edges.json')
    .await(visualize);

var sf = 1,
    nodeRad = d3.scaleLinear()
    .range([0, 20]),
    edgeWid = d3.scaleLinear()
    .range([0, 20])
    .domain([0, 1000])
color = d3.scaleSequential(d3.interpolateViridis)
    .domain([20, 120])
opacity = d3.scaleLinear()
    .range([0.4, 1])
    .domain([0, 400]),
    regionColor = d3.scaleOrdinal(d3.schemeCategory20)

function circleSize(value) {
    if (value > 20000) {
        return 10
    }
    if (value > 10000) {
        return 7
    }
    if (value > 5000) {
        return 6
    }
    if (value > 1000) {
        return 4
    }
    if (value > 500) {
        return 2.5
    }
    return 1.5
    /*var maxSize = 10, maxDomain = 60000
    return Math.sqrt(value / maxDomain) * maxSize*/
}

function circleOpacity(value) {
    if (value > 20000) {
        return 1
    }
    if (value > 10000) {
        return .9
    }
    if (value > 5000) {
        return .8
    }
    if (value > 1000) {
        return .7
    }
    if (value > 500) {
        return .6
    }
    return .5
}

function circleColor(value) {
    if (value > 20000) {
        return '#de2d26'
    }
    if (value > 10000) {
        return '#fb6a4a'
    }
    if (value > 5000) {
        return '#fc9272'
    }
    if (value > 1000) {
        return '#444'
    }
    if (value > 500) {
        return '#555'
    }
    return '#666'
}

function lineColor(value) {
    if (value > 200) {
        return '#fde725'
    }
    if (value > 150) {
        return '#90d743'
    }
    if (value > 100) {
        return '#35b779'
    }
    if (value > 75) {
        return '#21918c'
    }
    if (value > 50) {
        return '#31688e'
    }
    return '#443983'
}

function lineOpacity(value) {
    if (value > 200) {
        return 0.8
    }
    if (value > 150) {
        return 0.8
    }
    if (value > 100) {
        return 0.8
    }
    if (value > 75) {
        return 0.7
    }
    if (value > 50) {
        return 0.5
    }
    return 0.4
}

function lineSize(value) {
    if (value > 200) {
        return 3
    }
    if (value > 150) {
        return 2
    }
    if (value > 100) {
        return 1.5
    }
    if (value > 75) {
        return 1
    }
    if (value > 50) {
        return 0.4
    }
    return 0.3
}

function visualize(errors, nodeData, edgeData) {
    var edges = [],
        nodes = []
    nodeData.forEach(function (d) {
        if (d.y >= extent.y0 && d.y <= extent.y1 && d.x >= extent.x0 && d.x <= extent.x1) {
            nodes.push(d)
        }
    })

    edgeData.forEach(function (d) {
        if (d.path[0].y >= extent.y0 && d.path[2].y <= extent.y1 &&
            d.path[0].x >= extent.x0 && d.path[2].x <= extent.x1) {
            edges.push(d)
        }
    })

    var c = d3.conventions({
        parentSel: d3.select('#chart'),
        width: 645.7905 * sf * 2, //translates to 240mm
        height: 796.2513 * sf //translates to 290mm
    })

    nodes.sort(function (x, y) {
        return d3.descending(x.workers, y.workers);
    })
    edges.sort(function (x, y) {
        return d3.ascending(x.count, y.count);
    })

    c.x.domain([extent.x0, extent.x1])
    c.y.domain([extent.y0, extent.y1])

    console.log(place, JSON.stringify(extent))
    console.log('Loaded node count:', nodeData.length)
    console.log('Subsetted node count:', nodes.length)
    console.log('Loaded edge count:', edgeData.length)
    console.log('Subsetted edge count:', edges.length)
    console.log('width:', parseInt(c.width), ', height:', parseInt(c.height))

    var line = d3.line()
        .curve(d3.curveBundle.beta(0.69))
        .x(ƒ('x', c.x))
        .y(ƒ('y', c.y));

    if (drawLines) {
        c.svg.appendMany(edges, "path.edges")
            .attr("d", function (d) {
                return line(d.path);
            })
            .attr("opacity", ƒ('count', lineOpacity))
            .attr("fill", 'none')
            .attr("stroke", ƒ('count', lineColor))
            .attr("stroke-linecap", "round")
            .attr("stroke-width", ƒ('count', lineSize))
            .call(d3.attachTooltip)
    }

    if (drawCircles) {
        c.svg.appendMany(nodes, "circle.ring")
            .attr("r", ƒ('workers', circleSize))
            .attr("cx", ƒ('x', c.x))
            .attr("cy", ƒ('y', c.y))
            .attr("opacity", ".95")
            .style("fill", ƒ('workers', circleColor))
            .style("stroke", "#fff")
            .style("fill-opacity", ƒ('workers', circleOpacity))
            .style("stroke-width", 1)
            .call(d3.attachTooltip)
    }


};