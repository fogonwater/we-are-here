Map {
  background-color: #fff;
}

#parkmask {
  line-width:0.0;
  polygon-opacity:1;
  comp-op:dst-in;
}

.shade {
  ::dark {
      raster-opacity:1;
      raster-scaling:bilinear;//lanczos;
      raster-colorizer-default-mode: linear;
      raster-colorizer-default-color: transparent;
      raster-colorizer-stops:
        stop(0,   rgba(0,3,50,.5))
        stop(100, rgba(30,55,60,.4))
        stop(120, rgba(75,80,85,0.13))
        stop(180, rgba(180,180,180,0));
      raster-comp-op:multiply;
  }
  ::light {
      raster-opacity:1;
      raster-scaling:bilinear;//lanczos;
      raster-colorizer-default-mode: linear;
      raster-colorizer-default-color: transparent;
      raster-colorizer-stops:
        stop(180, rgba(180,180,180,0))
        stop(200, rgba(255,236,190,0))
      	stop(210, rgba(255,236,190,.075))
      	stop(255, rgba(255,236,210,.25));
      raster-comp-op:lighten;
    }
}

.slope {
  raster-opacity:1;
  raster-scaling:lanczos;
  raster-colorizer-default-mode: linear;
  raster-colorizer-default-color: transparent;
  raster-colorizer-stops:
    stop(0,rgba(255,255,255,0))
    stop(90,rgba(10,30,40,.85));
  raster-comp-op:color-burn;
}

#nznatparkssimp {
  ::base {
    line-width:0.0;
    polygon-opacity:1;
  	polygon-fill:#8BC69C;
    //comp-op:src-in;
  }
  ::noise {
    line-width:0.0;
    //polygon-pattern-file: url("noise.png");
    polygon-pattern-file: url("tree-noise.png");
    polygon-pattern-opacity:0.25;
   	raster-comp-op:multiply;
  }
}

#lcdb41 {
  line-width:0.0;
  polygon-opacity:1;
  polygon-fill:transparent;
  [LCGroup='Alpine'] {
  	::base {
    	line-width:0.0;
    	polygon-opacity:1;
  		polygon-fill:#E0DDD0;
  	}
  	::noise {
	    line-width:0.0;
    	polygon-pattern-file: url("blurred-noise.png");
    	polygon-pattern-opacity:0.25;
    	raster-comp-op:multiply;
  	}
  }
  [LCGroup='Artificial surfaces'] {polygon-fill: #444;}
  [LCGroup='Bare ground'] {polygon-fill: #DCDBD9;}
  [LCGroup='Exotic forest'] { polygon-fill:#77bc8b;   }
  [LCGroup='Exotic grassland'] {polygon-fill: #D7E9B6;}
  [LCGroup='Sand or gravel'] {
    ::base {
    	line-width:0.0;
    	polygon-opacity:1;
  		polygon-fill:#ffffdb;
  	}
  	::noise {
	    line-width:0.0;
    	polygon-pattern-file: url("blurred-noise.png");
    	polygon-pattern-opacity:0.2;
    	raster-comp-op:multiply;
  	}
  }
  [LCGroup='Scrub'],[LCGroup='Shrubland'] {
    ::base {
    	line-width:0.0;
    	polygon-opacity:1;
      	polygon-fill:#DEE9BE; // same as shrubland
  		//polygon-fill:#B6D6AA;
  	}
  	::noise {
	    line-width:0.0;
    	polygon-pattern-file: url("tree-noise.png");
    	polygon-pattern-opacity:0.25;
    	raster-comp-op:color-burn;
  	}
  }
  [LCGroup='Snow and ice'] {polygon-fill: #FAFCFF;}
  [LCGroup='Tussock grassland'] {
    ::base {
    	line-width:0.0;
    	polygon-opacity:1;
  		polygon-fill:#efE6B6;
  	}
  	::noise {
	    line-width:0.0;
    	polygon-pattern-file: url("blurred-noise.png");
    	polygon-pattern-opacity:0.42;
    	raster-comp-op:color-burn;
  	}
  }
  [LCGroup='Water'] {polygon-fill: #84c9f0 ;}
  [LCGroup='Wetland or flax'] {
    ::base {
    	line-width:0.0;
    	polygon-opacity:1;
  		polygon-fill:#a2dac5;
  	}
  	::noise {
	    line-width:0.0;
    	polygon-pattern-file: url("blurred-noise.png");
    	polygon-pattern-opacity:0.12;
    	//raster-comp-op:color-burn;
  	}
  }
}

#nzrivercentrelinesto {
  line-width:1.3;
  line-color:#84c9f0;
  line-cap: round;
}
