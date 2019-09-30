@land : #fff;
@water: #0057D2;
@drain: red;

Map {
  background-color: @land;
}

.lake {
  line-color:@water;
  line-width:0.0;
  polygon-opacity:1;
  polygon-fill: #2C77E2;
}

.river[Ignore!=1] {
  line-color:#6EA9FC;
  line-join: round;
  line-cap: round;
  line-width:0.8;
  [ORDER>1] {line-width: 1.0; line-color:#6EA9FC;}
  [ORDER>2] {line-width: 2.0; line-color:#5898F3;}
  [ORDER>3] {line-width: 3.0; line-color:#4288EB;}
  [ORDER>4] {line-width: 4.0; line-color:#2C77E2;}
  [ORDER>5] {line-width: 5.0; line-color:#1667DA;}
  [ORDER>6] {line-width: 5.0; line-color:@water;}
}

.snow {
  line-width:0.0;
  polygon-opacity:1;
  polygon-fill:@land;
}

.canaldrain {
  line-width:1.8;
  line-color:@drain;
}