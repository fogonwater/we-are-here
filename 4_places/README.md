# Chapter Four: Places

Notes and data sources for each spread in the **Places** chapter. Where programming was necessary to create a graphic, the code is provided in a sub-folder.

---

## 401 Historical Pā

The primary source for this map was a spreadsheet of all recorded pā which was supplied by the New Zealand Archaeological Association. The generalised river layer comes from Ollivier & Co, who in turn adapted it from the New Zealand Forest Service. The map was drafted in QGIS and finished in Adobe Illustrator. 

New Zealand Archaeological Association: ArchSite (2018)

- http://www.archsite.org.nz/

Ollivier & Co: NZ Major Rivers (2008)

- https://koordinates.com/layer/306-nz-major-rivers/

## 402 Where People Live

This map shows all two million points of Land Information New Zealand’s NZ Street Address dataset (February 2018). We created a CartoCSS style in TileMill and rendered the final map in three parts using Mapnik with the assistance of Python. We imported the resulting PNG files into Adobe Illustrator for final layout. Although the street addresses include businesses, they offer a sound view of residential patterns when printed at the 1:3,000,000 scale.

Land Information New Zealand: NZ Street Address (2018)

- https://data.linz.govt.nz/layer/53353-nz-street-address/

## 403 Edge of Town

Statistics New Zealand maintains two different sets of boundary definitions for each of New Zealand’s urban areas. The more liberal boundary includes large tracts of surrounding farmland and small satellite towns. We have displayed only the tighter boundary, which maps continuous built-up urban and suburban locales. Unfortunately, Statistics New Zealand does not publish population values for the tighter boundary.

To estimate the populations inside the silhouette, we extracted area unit (AU) values from the Statistics New Zealand ‘Subnational Population Estimates’ table (2017). We used QGIS to calculate the aggregate population size for each urban area by selecting and summing all area units with centroids inside the urban area.

Statistics New Zealand: Subnational Population Estimates (UA, AU), by Age and Sex, at 30 June 1996, 2001, 2006–18 (2017 boundaries)

- http://nzdotstat.stats.govt.nz/wbos/Index.aspx?DataSetCode=TABLECODE7541 

Statistics New Zealand: Urban Rural 2018 Generalised (2018)

- https://datafinder.stats.govt.nz/layer/92218-urban-rural-2018-generalised/

## 404–405 and 407–412 Where We Live and Work

These dasymetric dot density maps are based on the census’s ‘usually resident population count’ and ‘workplace address total count’ variables. The data was processed and mapped at the meshblock level. We used ancillary data to clip out regions of the meshblock that are unlikely to be homes or primary workplace addresses (for example ponds, wetlands and streets).

We used a QGIS function (`Random points inside polygons`) to examine the number of residents and workers in each meshblock and then allocated the dot a random position within the meshblock polygon. The dots were assigned a type variable of either ‘worker’ or ‘resident’. We saved all dot positions in a CSV spreadsheet. Prior to saving, we randomly shuffled the spreadsheet’s rows (`4_places/merge_resi_work.py`) to avoid biasing the draw order (for example, always drawing workers on top of residents). 

The basic map design was created with custom CartoCSS rules in TileMill. The final maps were rendered in NZTM2000 at a cartographic scale of 1:50,000 using Mapnik and Python. The labels were created in Adobe Illustrator.

Statistics New Zealand: 2013 Census Meshblock Dataset (2013)

- http://archive.stats.govt.nz/Census/2013-census/data-tables/meshblock-dataset.aspx

Manaaki Whenua – Landcare Research: Land Cover Database Version 4.1 (2015)

- https://lris.scinfo.org.nz/layer/48423-lcdb-v41-land-cover-database-version-41-mainland-new-zealand/ 

Land Information New Zealand: NZ Primary Road Parcels (2018)

- https://data.linz.govt.nz/layer/50796-nz-primary-road-parcels/

## 406 Homes and Workplaces

This map blends a slope surface with a shaded relief layer. Both layers were created using GDAL from a 1m DEM captured for Auckland Council by NZ Aerial Mapping & Aerial Surveying Limited. The map was created in QGIS and exported to Adobe Illustrator for finishing.

Auckland Council: Auckland LiDAR 1m DEM (2013)

- https://data.linz.govt.nz/layer/53405-auckland-lidar-1m-dem-2013/

## 413 City Sizes

This chart is based on RCG Realty’s New Zealand Local Population Database, which collates 120 years of New Zealand census data. We reshaped the data and built ranks with an R script (`413_city_sizes/prepare_cities.R`). A base chart with a custom D3.js script ((`413_city_sizes/script.js`)and exported as an SVG for finishing in Adobe Illustrator.

RCG Realty: New Zealand Local Population Database (2018)

- https://www.rcg.co.nz/insight/new-zealand-local-population-database

## 414 Middle of Somewhere

An initial version of this map was created using the Malaria Atlas Project’s (MAP) 2015 global map of accessibility. Their accessibility map combines terrain, land cover and transport network data to estimate travel times to high-density urban centres at a resolution of 1 x 1 kilometre pixels.

MAP’s analysis does not include Tauranga as a major urban centre, skewing representations of the Bay of Plenty and the East Coast. Fortunately, the project has made their tools and data available as an open-source project. We used [MAP’s R interface](https://github.com/malaria-atlas-project/malariaAtlas) to access a global friction surface. Finally, we calculated an accumulated cost surface analysis on New Zealand’s major urban centres using R’s gdistance package.

The final display map was prepared in QGIS and exported to Adobe Photoshop. We used GDAL to derive slope and hill shade layers from Manaaki Whenua’s 25-metre NZDEM digital elevation model. Finally, we combined the accessibility map with slope and hill shading layers in Photoshop to convey a sense of physical terrain.

Malaria Atlas Project: Accessibility to Cities Friction Surfaces (2015)

- https://map.ox.ac.uk/research-project/accessibility_to_cities/ 

Malaria Atlas Project: Malaria Atlas R Interface (2019)

- https://github.com/malaria-atlas-project/malariaAtlas

Manaaki Whenua — Landcare Research: NZDEM South Island 25 metre (2010)

- https://lris.scinfo.org.nz/layer/48127-nzdem-south-island-25-metre/

Manaaki Whenua — Landcare Research: NZDEM North Island 25 metre (2010)

- https://lris.scinfo.org.nz/layer/48131-nzdem-north-island-25-metre/
