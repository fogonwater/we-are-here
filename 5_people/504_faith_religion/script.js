const svg   = d3.select("svg"),
  		width = +svg.attr("width"),
  		height= +svg.attr("height"),
      margin= 20,
			filter_group = 'Other'

// Set up some scales
const y = d3.scaleLog()
				.range([height-margin, margin]),
      color = d3.scaleOrdinal(d3.schemeCategory10),
      formatComma = d3.format(",")

// Load our external data
d3.csv("data/religion_in_nz.csv", function(data) {
  
  data.forEach(function(d) {
    d.num_2013 = +d.num_2013
    d.num_2001 = +d.num_2001
    d.per_change_01_13 = (d.num_2013 - d.num_2001) / d.num_2001 * 100
    d.label_2001 = d.religion + ' (' + formatComma(d.num_2001) + ')'
    d.label_2013 = d.religion + ' (' + formatComma(d.num_2013) + ')'
    if (Math.round(d.per_change_01_13) > 0) {
      d.percent_label = '+' + Math.round(d.per_change_01_13) + '%'
    } else {
      d.percent_label = Math.round(d.per_change_01_13) + '%'
    }
  })
  
  y.domain([50, d3.max(data, (d) => d.num_2013)])
  data.sort(function(x, y){return d3.ascending(x.num_2013, y.num_2013)})
  data = data.filter(function(d){return d.note != 'Ignore';})
  
  svg.selectAll(".labels_2001")
        .data(data)
      .enter().append("text")
  			.attr("x", 410 )
  			.attr("y", (d) => y(d.num_2001) )
  			.style('fill', (d) => color(d.supergroup))
  			.text((d) => d.label_2001)
  			.style("text-anchor", "end")
  
  svg.selectAll(".labels_2013")
        .data(data)
      .enter().append("text")
  			.attr("x", 510 )
        .attr("y", (d) => y(d.num_2013) )
  			.style('fill', (d) => color(d.supergroup))
  			.text((d) => d.label_2013)
  
  svg.selectAll(".labels_percents")
        .data(data)
      .enter().append("text")
  			.attr("x", 460 )
        .attr("y", (d) => y(
    			((d.num_2013 - d.num_2001) /2) + d.num_2001
  			))
  			.style('fill', (d) => color(d.supergroup))
  			.style("text-anchor", "middle")
  			.text((d) => d.percent_label)
  
  svg.selectAll(".connectors")
        .data(data)
      .enter().append("line")
        .attr("x1", 415)
        .attr("y1", (d) => y(d.num_2001))
        .attr("x2", 505)
        .attr("y2", (d) => y(d.num_2013))
        .style('stroke', (d) => chroma(color(d.supergroup)).brighten())
  			.style('stroke-width', 2)
  
})