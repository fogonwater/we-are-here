const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  margin = 20,
  gap = 85

// Set up some scales
const x = d3.scaleLinear().range([0, width]),
  y = d3.scaleLinear().range([height, 0]),
  color = d3.scaleOrdinal(d3.schemeCategory10),
  formatComma = d3.format(",")

const q = d3
  .queue()
  .defer(d3.csv, "data/provider_based_enrolments_predominant_field_study_2017_final.csv")
  .await(visualize)

// Load our external data
function visualize(errors, data) {
  
  //data = data.filter((d) => d.Narrow != 'Total')
  data.forEach(function (d) {
    d.Female = +d.Female
    d.Male = +d.Male
  })

  data.sort(function (x, y) {return d3.ascending(x.Female, y.Female)})
  data.sort(function (x, y) {return d3.descending(x.Broad, y.Broad)})

  data.forEach(function (d) {
    if (d.Narrow == 'Total') {
      d.Female = 0
      d.Male = 0
      d.Narrow = d.Broad.replace(': Total', '').toUpperCase()
    }
  })

  x.domain([0, d3.max(data, (d) => d.Female) * 2.5])
  y.domain([0, data.length])

  svg
    .selectAll(".female")
    .data(data)
    .enter().append("rect")
    .attr("x", d => (width / 2) - gap - x(d.Female))
    .attr("y", (d, i) => y(i))
    .attr("width", (d) => x(d.Female))
    .attr("fill", (d) => (d.Female > d.Male) ? 'crimson' : chroma("crimson").brighten(2))
    .attr("height", 10)

  svg
    .selectAll(".male")
    .data(data)
    .enter().append("rect")
    .attr("x", (width / 2) + gap)
    .attr("y", (d, i) => y(i))
    .attr("width", (d) => x(d.Male))
    .attr("fill", (d) => (d.Male > d.Female) ? 'steelblue' : chroma("steelblue").brighten(2))
    .attr("height", 10)

  svg
    .selectAll(".narrows")
    .data(data)
    .enter().append("text")
    .attr("x", width / 2)
    .attr("y", (d, i) => y(i) + 10)
    .text(d => d.Narrow)
    .attr("text-anchor", "middle")

  svg
    .selectAll(".female_count")
    .data(data)
    .enter().append("text")
    .attr("x", (d) => width / 2 - gap - x(d.Female) - 5)
    .attr("y", (d, i) => y(i) + 10)
    .attr("fill", "crimson")
    .text(d => formatComma(d.Female))
    .attr("text-anchor", "end")

  svg
    .selectAll(".male_count")
    .data(data)
    .enter().append("text")
    .attr("x", (d) => width / 2 + gap + x(d.Male) + 5)
    .attr("y", (d, i) => y(i) + 10)
    .attr("fill", "steelblue")
    .text(d => formatComma(d.Male))
    .attr("text-anchor", "start")



}

function radius(val) {
  var max_radius = 20,
    max_value = 14
  return Math.sqrt(val / max_value) * max_radius
}