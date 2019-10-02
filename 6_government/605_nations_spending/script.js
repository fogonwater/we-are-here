const BASE_YEAR = '2019',
  MAX_DISPLAYED = 30
  LIMITER = 'd.value > 0' //(Social housing cut-off)
  //LIMITER = 'd.value > 1'

const format1dp = d3.format(",.1f")

const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  box_width = 105,
  //box_height = 815,
  box_height = 65,
  vert_box_margin = 5,
  horiz_box_margin = 35,
  box_per_row = Math.floor(width / (box_width + horiz_box_margin)),
  box_per_col = 10,
  sq_margin = 1,
  sq_per_row = 20,
  sq_width  = (box_width / sq_per_row) - sq_margin,
  sq_height = sq_width

const q = d3
  .queue()
  .defer(d3.csv, "data/b18-expenditure-data.xls - budget_by_vote.csv")
  //.defer(d3.json, 'data/demo-data.json')
  .await(visualize)

// Load our external data
function visualize(errors, data) {
  data.forEach(function(d) {
    d.value = +d[BASE_YEAR]
  })

  data = data.filter((d)=> d.value > 0)

  data.sort(function(a, b){ return d3.ascending(a.value, b.value) })
  //x.domain(d3.extent(data, d => d.val1))
  //y.domain([0, d3.max(data, d => d.val2)])
  let boxes = [],
      squares = [],
      el_count = 0
  
  data.forEach(function(d, i) {
    if (eval(LIMITER) && boxes.length < MAX_DISPLAYED) {
      row_num = Math.floor(boxes.length / box_per_row);
      col_num = Math.floor(boxes.length / box_per_col);
      box_x = col_num * (box_width + horiz_box_margin) + horiz_box_margin;
      box_y = (boxes.length % box_per_col) * (box_height + vert_box_margin) + box_height;
      //box_x = (boxes.length % box_per_row) * (box_width + horiz_box_margin);
      //box_y = row_num * (box_height + vert_box_margin) + box_height;
      boxes.push({
        'label': d.Vote + ' $' + value_label(d.value),
        'value': d.value,
        'x': box_x,
        'y': box_y
      });

      for (var j=0; j < d.value; j+=10000) {
          jj = j / 10000;
          colour = 'steelblue';
          sq_row_num = Math.floor(jj / sq_per_row);
          sq_x = (jj % sq_per_row) * (sq_width + sq_margin) + box_x;
          sq_y = sq_row_num * (sq_height + sq_margin) + box_y;
          squares.push({
              'x':sq_x,
              'y':sq_y,
              'colour':colour
          })
      }
    }
  })
  console.log(boxes)

  svg
    .selectAll(".circles")
    .data(squares)
    .enter().append("circle")
      .attr("cx", d => d.x + (sq_width / 2))
      .attr("cy",  d => d.y)
      .attr("r", sq_width / 2)
      .attr("height", sq_height)
      .attr("fill", 'steelblue')

  svg
    .selectAll(".labels")
    .data(boxes)
    .enter().append("text")
      .attr("x", d => d.x)
      .attr("y",  d => d.y - 7.5)
      .attr("font-size", "10px")
      .text(d => d.label)
}

function radius(val) {
  var max_radius = 20,
    max_value = 14
  return Math.sqrt(val / max_value) * max_radius
}

// MAKE HUMAN FRIENDLY NUMBER LABELS
function value_label(n) {
  if (n > 1000000) {
    return format1dp(n / 1000000) + 'Bn'
    //return Number(Math.round(n / 100000) / 10) + 'Bn';
  } else if (n > 1000) {
    return format1dp(n / 1000) + 'M'
    return Number(Math.round(n / 100) / 10) + 'M';
  }
  else {return 0;}
}