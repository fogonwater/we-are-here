Map {
  background-color: #000000;
}

.lake {
  line-width:0.0;
  polygon-opacity:1;
  polygon-fill:#333;
}

.contour {
  line-width:0.5;
  line-color:#AE0E18;
  [elevation>250] {line-color:#FF2B13}
  [elevation>500] {line-color:#FF8F29}
  [elevation>1000] {line-color:#FFED6F}
  [elevation>1500] {line-color:#FFFFB2}
  [elevation>2000] {line-color:#FFFFCE}
}