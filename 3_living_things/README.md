# Chapter Three: Living Things

## 301 Teeming Masses

Species estimates are difficult to obtain due to the large number of undiscovered species and contested definitions. We settled for a list of species counts in Te Ara. These numbers should be treated as approximations. The species silhouettes were drawn in Illustrator. The shape sizes are based on a [rectangular treemap](https://docs.google.com/spreadsheets/d/1J96Td3opCK37-G4oDCH7kO9xo29sn161KpisTgrvqeI/edit?usp=sharing), which was created using Google Sheets.

Ministry for Culture and Heritage: Species Unique to New Zealand (2007)

- https://teara.govt.nz/en/native-plants-and-animals-overview/page-1

## 302 Threatened Environments: South Island and Threatened Environments: North Island

All maps were created from the Manaaki Whenua Threatened Environment Classification, which represents the status and protection level of indigenous vegetation cover in 2012. We used QGIS for initial styling and map composition. We simplified the shapefile’s geometry using the Visvalingam Weighted Area function in [Mapshaper](https://mapshaper.org/), enabling us to import the exported vector shapes into Adobe Illustrator for finishing.

Manaaki Whenua — Landcare Research: Threatened Environments Classification (2015)

- http://www.landcareresearch.co.nz/resources/maps-satellites/threatened-environment-classification/downloads

## 304 Conservation Land

The national map of protected conservation land was prepared in QGIS and finished in Adobe Illustrator. Due to the small size of New Zealand’s marine reserves, the points were manually positioned in Adobe Illustrator. The national map is rendered at a cartographic scale of 1:3,000,000 in NZTM2000. 

Department of Conservation: DOC Marine Reserves (2018)

- https://doc-deptconservation.opendata.arcgis.com/datasets/0e74f9682502447c9a14d51340512361_0 

Department of Conservation: DOC Sanctuaries to Protect Marine Mammals (2018)

- https://doc-deptconservation.opendata.arcgis.com/datasets/abf12dd2f4cd43b3a7fdfc5a0a2ad2c9_0 

Department of Conservation: DOC Public Conservation Land (2018)

- https://doc-deptconservation.opendata.arcgis.com/datasets/72354ba9bf7a4706af3fdfe60f86eea1_0 

Ngāi Tūhoe: Map of Te Urewera (2019)

- http://www.ngaituhoe.iwi.nz/te-urewera-map

## 305 National Parks

The land cover data is a reclassification of Manaaki Whenua’s Land Cover Database (LCDB) version 4.1. We used GDAL to derive slope and hill shading raster layers from Manaaki Whenua’s 25-metre NZDEM digital elevation models. We created a series of CartoCSS style rules for the simplified land cover, slope and shaded relief in TileMill (`305_national_parks/style.mss`) before rendering the maps directly with Python and Mapnik in NZTM2000. All the national park maps are printed a cartographic scale of 1:760,000. 

Department of Conservation: DOC Public Conservation Land (2018)

- https://doc-deptconservation.opendata.arcgis.com/datasets/72354ba9bf7a4706af3fdfe60f86eea1_0 

Manaaki Whenua — Landcare Research: Land Cover Database Version 4.1 (2015)

- https://lris.scinfo.org.nz/layer/48423-lcdb-v41-land-cover-database-version-41-mainland-new-zealand/

Manaaki Whenua — Landcare Research: NZDEM South Island 25 metre (2010)

- https://lris.scinfo.org.nz/layer/48127-nzdem-south-island-25-metre/

Manaaki Whenua — Landcare Research: NZDEM North Island 25 metre (2010)

- https://lris.scinfo.org.nz/layer/48131-nzdem-north-island-25-metre/

## 306 Birds of a Feather

Christopher Robertson from the Ornithological Society of New Zealand supplied a spreadsheet of bird observation data that was used to create their publication Atlas of Bird Distribution in New Zealand 1999–2004. We created individual spreadsheets for each species using a custom R script (`306_birds_feather/viz_bird_species.R`). We are unable to provide the data here due to licensing, but a link to the source organisation is provided below.

The original map coordinates were supplied in the NZMG1949 projection. We reprojected the data to NZTM2000 in QGIS. The final grid dot maps were created in QGIS and are rendered at a cartographic scale of 1:15,000,000.

Ornithological Society of New Zealand: Atlas of Bird Distribution in New Zealand (2007)

- https://www.osnz.org.nz/publications/atlas-bird-distribution-new-zealand-1999-2004

## 307 Pests and Predators

We downloaded eight shapefiles of land pest distribution polygons. We performed a spatial join between the distribution polygons and the point grid generated for the native bird maps in the Birds of a Feather spread. We exported the resulting dot maps to Adobe Illustrator for labelling and finishing.

The maps are projected in NZTM2000 at a cartographic scale of 1:15,000,000.

Ministry for the Environment: Land Pests Data 2002–2014 (2016)

- https://data.mfe.govt.nz/data/category/environmental-reporting/land/pests/

## 308 Secret Lives of Cats

Dr Heidy Kikillus from Victoria University of Wellington provided access to the cats’ activity patterns as a series of shapefiles. We composed the map in QGIS using Wellington City Council building footprints to provide context. Colouring, labelling and finishing took place in Adobe Illustrator.

The map is rotated 90 degrees so that north is the left page margin. The final map is rendered in NZTM2000 at a cartographic scale of 1:50,000. 

Cat Tracker NZ (2017)

- http://cattracker.nz/

Wellington City Council: Wellington City Building Footprints (2017)

- https://koordinates.com/layer/1474-wellington-city-building-footprints/
