# Chapter Two: Air & Water

## 201 Lightning Strikes

The lightning map was created from Transpower’s Lightning Detection Network database. We created CartoCSS style rules in Tilemill (`201_lightning_strikes/style.mss`), making heavy use of colorize-alpha image-filter rules. The final map was drawn in NZTM2000 at a cartographic scale of 1:7,000,000 using Python and Mapnik.

Transpower: New Zealand Lightning Detection Network (2014)

- http://archive.stats.govt.nz/browse_for_stats/environment/environmental-reporting-series/environmental-indicators/Home/Atmosphere-and-climate/lightning.aspx 

## 202 Rivers and Channels

This map was created from the River Environment Classification of New Zealand (REC) produced by NIWA and published by Ministry for the Environment. River widths are based on the dataset’s “order” attribute, which denotes their hierarchical position in the hydrological network. The REC is produced using a simulated model that combines terrain characteristics with rainfall data. Sometimes the model locates rivers in places where they don’t actually, especially on plainlands dominated by agricultural and horticultural land use. To address this issue, we manually compared the NIWA model to the Land Information New Zealand 1:50,000 hydrological database and removed REC lines that do not correspond with the topographic cover. These efforts focused on areas where artificial drainage is present.

The final maps was created by combining the modified REC dataset with LINZ 1:50k drains, canals and permanent snow cover. The map was styled in Tilemill (`202_rivers_channels/style.mss`) and rendered with Mapnik at a cartographic scale of 1:3,000,000 in NZTM2000.

Ministry for the Environment: River Environment Classification (2010)

- https://data.mfe.govt.nz/layer/51845-river-environment-classification-new-zealand-2010/

Land Information New Zealand: NZ Drain Centrelines Topo50 (2018)

- https://data.linz.govt.nz/layer/50262-nz-drain-centrelines-topo-150k/ 

Land Information New Zealand: NZ Canal Centrelines Topo50 (2018)

- https://data.linz.govt.nz/layer/50250-nz-canal-centrelines-topo-150k/ 

Land Information New Zealand: NZ Canal Polygons Topo50 (2018)

- https://data.linz.govt.nz/layer/50251-nz-canal-polygons-topo-150k/ 

Land Information New Zealand: NZ Snow Polygons Topo50 (2018)

- https://data.linz.govt.nz/layer/50191-nz-snow-polygons-topo-1250k/

## 203 Wet and Dry

This map was created in QGIS by styling the Land Environments of New Zealand Monthly Water Balance Ratio raster grid. The final map is presented at a cartographic scale of 1:3,000,000 in NZTM2000. Labels and urban settlements were manually placed in Adobe Illustrator.

Manaaki Whenua – Landcare Research: LENZ Monthly water balance ratio (2010)

- https://lris.scinfo.org.nz/layer/48093-lenz-monthly-water-balance-ratio/

## 204 A Year of Weather

We downloaded daily temperature summaries and rainfall values from NIWA’s CliFlo service. Measurements come from the following stations: Kaitaia Aero Ews (18183), Auckland Aero (1962), Gisborne Ews (24976), New Plymouth Aws (2283), Wellington Aero (3445), Nelson Aws (4271), Christchurch Kyle St Ews (24120), Queenstown Aero Aws (5451) and Invercargill Aero Aws (11104). Charts were constructed using custom D3.js code (`204_year_weather/script.js`), exported to SVG using [SVG Crowbar](https://nytimes.github.io/svg-crowbar/) and imported into Adobe Illustrator for finishing.

NIWA: The National Climate Database (2014)

- https://cliflo.niwa.co.nz/

The Year of Weather charts were inspired by Raureif Studio’s [Weather Radials poster](http://www.weather-radials.com/).


## 205 Dry Spells

The charts were constructed in D3.js (`205_dry_spells/script.js`) with daily data from NIWA’s New Zealand Drought Monitor system. The drought categories are NIWA’s qualitative descriptions for New Zealand Drought Index ranges.

Note that these charts were created while Chris went through a phase of using [d3-jetpack](https://github.com/gka/d3-jetpack) so the D3.js syntax may look a little weird.

NIWA: New Zealand Drought Index

- https://www.niwa.co.nz/climate/information-and-resources/drought-monitor 

## 206 Scale of Irrigation

The irrigated fields layer comes from the Ministry for the Environment’s 2017 environmental reporting. We shaded the field polygons different colours to visually individuate them. Smaller polygons are dark green and larger polygons are light green. The basemap consists of a LINZ road network and a shaded relief map. The shaded relief layer was created using GDAL from a Manaaki Whenua digital elevation model.

The map was compiled in QGIS. It is projected in NZTM2000 at a cartographic scale of 1:350,000. Labelling and finishing took place in Adobe Illustrator.

Ministry for the Environment: Irrigated land area (2017)

- https://data.mfe.govt.nz/layer/90838-irrigated-land-area-2017/ 

Land Information New Zealand: NZ Road Centrelines Topo250 (2018)

- https://data.linz.govt.nz/layer/50184-nz-road-centrelines-topo-1250k/ 

Manaaki Whenua — Landcare Research: NZDEM South Island 25 metre (2010)

- https://lris.scinfo.org.nz/layer/48127-nzdem-south-island-25-metre/ 

## 207 Rising Temperatures

The charts were created using NIWA’s “eleven-station series” long-term temperature data. We opted to only use ten of the eleven stations as Molesworth ceased operation in 1994. NIWA has published an Excel spreadsheet of anomaly data for these stations, which ends at 2009. Under the advice of NIWA staff, we extended the data series beyond 2009 using data from CliFlo. We checked pre-2009 measurements from CliFlo against the supplied NIWA spreadsheet to ensure we were working with the correct data.

The charts were produced in R using dplyr and ggplot2 (`207_rising_stations/viz_stations.R`). We exported the charts as vector graphics with SVG crowbar and finished the spread in Adobe Illustrator.

NIWA: 11-Station annual temperature series data (2009)

- https://www.niwa.co.nz/our-science/climate/information-and-resources/nz-temp-record/temperature-trends-from-raw-data

NIWA: CliFlo (2018)

- https://cliflo.niwa.co.nz/ 

## 208 Wind Patterns

We downloaded hourly surface wind measurements for 2014 from https://cliflo.niwa.co.nz for ten climate stations: Auckland (agent 22719), Gisborne (24976), Awakino (25726), Akitio (38057), Wellington (18234), Blenheim (12430), Greymouth (23934), Christchurch (24120), Dunedin (15752) and Bluff (5823).

The visualisations are SVGs created using custom D3.js programming (`208_wind_patterns/script.js`) and extracted with SVG Crowbar. We adjusted colours, added labels and created the final layout in Adobe Illustrator.

NIWA: CliFlo (2014)

- https://cliflo.niwa.co.nz/ 


## 209 The Windy City

We sourced 2018 wind zone data and building footprints from Wellington City Council. The map is printed at a cartographic scale of 1:50,000. It was composed in QGIS and finished in Adobe Illustrator.

Wellington City Council: Wellington City Wind Zones (2018)

- https://data-wcc.opendata.arcgis.com/datasets/3b72cfc136854100a208237e1a6749e6_1 

Wellington City Council: Wellington City Building Footprints (2018)

- https://koordinates.com/layer/1474-wellington-city-building-footprints/ 


## 210 Antarctic Expedition

We received anonymised GPS scientist movement data directly from Fraser Morgan of Manaaki Whenua. The base map is a blends a slope map with a shaded relief surface, both of which were created from a LiDAR DEM of the McMurdo Dry Valleys. The “rips” in the shaded relief correspond to LiDAR survey data. We overlaid the GPS trails over the relief surface and exported the combined map as a high resolution JPEG. This image was imported into Adobe Illustrator, where we added place names and annotations.

The map is projected in WGS 84 / USGS Transantarctic Mountains (EPSG:3294) at a cartographic scale of 1:45,000.

Manaaki Whenua – Landcare Research: Multi-disciplinary science team expedition GPS points (2016)

- Data supplied directly.

Open Topography: LiDAR survey of the McMurdo Dry Valleys, Antarctica (2014–2015)

- http://opentopo.sdsc.edu/raster?opentopoID=OTSDEM.112016.3294.1

