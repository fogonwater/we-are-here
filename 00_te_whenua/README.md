# Chapter One: Te Whenua

Notes and data sources for each spread in the Te Whenua chapter. Where programming was necessary to create a graphic, the code is provided in a sub-folder.

## Drowned Continent

This map is based on NIWA’s 250-metre resolution New Zealand Regional Bathymetry (2016) digital elevation model. The map was composed in QGIS with a cartographic scale of 1:10,750,000. Unlike most maps in this book, it uses the NZGD2000 projection. The three-dimensional bathymetry effect was achieved by combining the shaded relief with the DEM in ‘overlay’ blending mode. We derived a shaded relief layer from the NIWA DEM. We exported the bathymetry basemap as a PNG and the boundaries as a PDF. These layers were imported into Adobe Illustrator for labelling and finishing.

NIWA: New Zealand Regional Bathymetry 250 metre (2016)
https://www.niwa.co.nz/our-science/oceans/bathymetry


## Te Waipounamu and Te Ika a Maui

We prepared the map styles and colours in TileMill (`style.mss`). The TileMill CartoCSS was exported as a Mapnik XML style file — not included as heavily dependent on location of data. The final basemaps were rendered in NZTM2000 at a cartographic scale of 1:3,000,000 using custom Python code and Mapnik (`render_contours.py`). Place name labels were created by hand in Adobe Illustrator.

Land Information New Zealand: NZ Contours Topo50 (2018)
https://data.linz.govt.nz/layer/768-nz-contours-topo-150k/

## Rock Ages and Most Ancient Rocks

The geological age map was created from GNS Science’s Geology Map of New Zealand 1:250,000 Digital Vector Data. We reclassified the data into geological ages based on the source data’s STRATAGE field (see `assign_rock_period.py`). The source geometry was simplified for presentation at a coarser cartographic resolution. Both basemaps were prepared in QGIS and exported as SVGs for labelling and finishing in Adobe Illustrator.

GNS charges for the source data so we are unable to provide examples of the data.

The Rock Ages map is presented at a cartographic scale of 1:3,000,000. Most Ancient Rocks is at a scale of 1:500,000.

GNS Science: Geology Map of New Zealand 1:250,000 (2012)
https://www.gns.cri.nz/Home/Products/Maps/Geological-Maps

## Origins and Faults

The data behind this map is a simplified reclassification of GNS’s Geology Map of New Zealand. We used a look-up table to classify the rock-group field into igneous, sedimentary or metamorphic rock. We used the stratigraphic-age field to define whether the rock was older or younger than 2.5 million years.

See `assign_major_rock_class.py` for our code. GNS charges for the source data so we are unable to provide examples of the data.

We constructed the basemap in QGIS and the final map in Adobe Illustrator. The map is presented in NZTM2000 at a cartographic scale of 1:3,000,000.

GNS Science: Geology Map of New Zealand 1:250 000 (2012)
https://www.gns.cri.nz/Home/Products/Maps/Geological-Maps

GNS Science: Active Faults Database (2018)
https://data.gns.cri.nz/af/

## Deep Earthquakes and Shallow Earthquakes

Both spreads are based on data from the Geonet Quake Search service. We wrote a small Python script (`get_quakes.py`) to query the service for earthquakes occurring between 2008 and 2018 and then merged the results into a single file. We imported the CSV files into QGIS and reprojected the data from WGS84 to NZTM2000. The two different maps were created by filtering the ‘depth’ variable and applying a proportional size formula to the ‘magnitude’ variable.

We exported the maps as SVGs and finished the maps in Adobe Illustrator. This included adding drop shadows to the deep earthquakes and a transparency effect to the shallow quakes. The final maps are drawn at a scale of 1:9,000,000. 

Geonet: Quake Search (2018)

- https://quakesearch.geonet.org.nz/

## The Sinking City

We obtained a LiDAR-derived 5-metre DEM of elevation changes across most of Christchurch from Dr Matthew Hughes at Lincoln University. We styled the map in QGIS and combined it with city council building footprints. This composite was exported as a PNG. Layout labelling and finishing took place in Adobe Illustrator. The final map is presented in NZTM2000 at a scale of 1:30,000.

Canterbury Geotechnical Database: Vertical Ground Surface Movements, Map Layer CGD0600 (2012)

- https://canterburygeotechnicaldatabase.projectorbit.com/ and
http://www.geosociety.org/gsatoday/archive/25/3/article/i1052-5173-25-3-4.htm 

Christchurch City Council: Christchurch City Building Footprints (2015)

- https://koordinates.com/layer/6676-christchurch-city-building-footprints/

## Land Cover

The land cover classifications and national totals come from Manaaki Whenua’s Land Cover Database (LCDB) version 4.1. The original data was captured during 2012 and 2013. To create the chart we generated a rasterised grid at 10-kilometre resolution from a polygon representing mainland New Zealand. In QGIS we manually classified cells into one of 33 land cover types, endeavouring to keep similar land cover types together where possible and approximate rectangular shapes.

We exported the shapefile from QGIS as an SVG for labelling and colour adjustment in Adobe Illustrator. All area land cover totals are rounded to the nearest 100 square kilometre.

This spread was inspired by Bloomberg’s ‘How America Uses Its Land’ graphic.

Manaaki Whenua — Landcare Research: LCDB v4.1 — Land Cover Database Version 4.1, Mainland New Zealand (2015)

- https://lris.scinfo.org.nz/layer/48423-lcdb-v41-land-cover-database-version-41-mainland-new-zealand/ 

Bloomberg: Here’s How America Uses Its Land

- https://www.bloomberg.com/graphics/2018-us-land-use/

