# Chapter Seven: Movement and Energy

Notes and data sources for each spread in the **Movement and Energy** chapter. Where programming was necessary to create a graphic, the code is provided in a sub-folder.

---

## 701 Roads and Rail

We received an extract of the New Zealand Transport Agency’s Road Assessment and Maintenance Management (RAMM) directly from the NZTA. We simplified the line geometries using Mapshaper and drafted a map in QGIS. We exported the roads and railways to Adobe Illustrator for finishing. The final map is presented in NZTM200 at a cartographic scale of 1:3,000,000.

Land Information New Zealand: NZ Railway Centrelines Topo500 (2018)

- https://data.linz.govt.nz/layer/50221-nz-railway-centrelines-topo-1500k/

New Zealand Transport Agency: Road Assessment and Maintenance Management (2017)

- https://www.nzta.govt.nz/roads-and-rail/road-efficiency-group/projects/onrc

## 702 Auckland Commutes and 703 Wellington Commutes

Both maps were created using Statistics New Zealand’s ‘Usual Residence by Workplace’ table (2013). We pre-processed the CSV table with a Python script that converted the data from wide to long format and added geographic coordinates. We created the network visualisation in D3.js (`702_703_auckland_wellington_commutes/script.js`), exporting the paths as vectors for finishing in Adobe Illustrator.

Statistics New Zealand: Usual Residence by Workplace Address, Area Unit, 2013 Census 

- http://archive.stats.govt.nz/Census/2013-census/profile-and-summary-reports/commuter-view-visualisation.aspx 

## 704 Traffic in Town

The medium-sized-town traffic volume maps are created from an extract of the NZTA’s Road Assessment and Maintenance Management (RAMM) dataset, which is based on CoreLogic’s national road network centreline geometry. Line symbol width is proportional to the dataset’s Average Annual Daily Traffic (AADT) field. Town populations come from Statistics New Zealand’s 2018 subnational population estimates.

The initial maps were created in QGIS then exported as SVGs to Adobe Illustrator for finishing and labelling. All maps are displayed at a cartographic scale of 1:60,000 and projected in NZTM2000.

New Zealand Transport Agency: Road Assessment and Maintenance Management (2017)

- https://www.nzta.govt.nz/roads-and-rail/road-efficiency-group/projects/onrc


## 705 Under Christchurch

We obtained a shapefile of Christchurch wastewater pipes from Dr Matthew Hughes at Lincoln University, with permission from Christchurch City Council. We drafted the map in QGIS and added labels in Adobe Illustrator. The bar chart was created in R using ggplot2.

Christchurch City Council: Wastewater Pipes (2017)

- https://www.ccc.govt.nz/consents-and-licences/property-information-and-lims/drainage-plans-for-your-property/

## 706 Loads of Rubbish

The data for this chart comes from a report on Auckland’s waste published in 2017, specifically ‘Table 8: Domestic Kerbside Waste Composition (Private and Council — Collected)’ and ‘Table 10: Domestic Kerbside Recycling Composition for the Auckland Region’. We created a draft treemap visualisation of the data in Google Sheets. Tim drew the icons directly in Adobe Illustrator, using the treemap as a base.

Auckland Council: Auckland’s Waste Assessment 2017 (2017)

- https://www.aucklandcouncil.govt.nz/plans-projects-policies-reports-bylaws/our-plans-strategies/topic-based-plans-strategies/environmental-plans-strategies/Pages/waste-management-minimisation-plan.aspx

## 707 Broadband Access

We created a simplified map of national broadband coverage from a shapefile provided by InternetNZ for display at a scale of 1:3,000,000. This task was performed onsite at InternetNZ. We exported the simplified coverage to SVG and styled the map in Adobe Illustrator.

InternetNZ: National Broadband Map (2017)
https://broadbandmap.nz/ 


## 708 Connected to the World

We obtained permission to use this data from TeleGeography. We wrote a custom D3.js script to visualise the data on a Azimuthal Equidistant projection with the map centred on New Zealand (`708_connected_world/script.js`). This projection ensures that all points on the map are at proportionally correct distances from the centre point. The final map was coloured and labelled in Adobe Illustrator.

TeleGeography: Submarine Cable Map (2018)
- https://www.submarinecablemap.com/

## 709 Trading Partners

These charts were created with tables from Statistics New Zealand’s ‘Infoshare Harmonised Trade’ data series. We wrote a Python script to determine the 40 top two-way trading partners in 2017. We merged exports and imports into a long-format CSV file to prepare for visualisation. The small multiples area charts were generated in R using ggplot2.

Statistics New Zealand: Harmonised Trade — Total Exports (Exports + Re-exports) (Aggregated Monthly — Financial Year). Table Reference: TER001F (2018)

- http://archive.stats.govt.nz/infoshare/TradeVariables.aspx 

Statistics New Zealand: Harmonised Trade — Imports (Aggregated Monthly — Financial Year). Table Reference: TIM001C (2018)

- http://archive.stats.govt.nz/infoshare/TradeVariables.aspx

## 710 What We Sell and 711 What We Buy

We wrote a Python script to transform the flat spreadsheet data into a hierarchy. We visualised these hierarchies as nested bubble trees using a custom D3.js script. The charts only display imports and exports that exceed $1 million. Labels and colours were fine-tuned in Adobe Illustrator.

Statistics New Zealand: Harmonised Trade — Total Exports (Exports + Re-exports) (Aggregated Monthly — Financial Year). Table Reference: TER001F (2018)

- http://archive.stats.govt.nz/infoshare/TradeVariables.aspx 

Statistics New Zealand: Harmonised Trade — Imports (Aggregated Monthly -— Financial Year). Table Reference: TIM001C (2018)

- http://archive.stats.govt.nz/infoshare/TradeVariables.aspx

## 712 Who Visits?
We accessed the arrivals data from Infoshare’s Tourism / International Travel and Migration collection. We cleaned the data using a Python script. The chart was created using a custom D3.js script and then exported to Adobe Illustrator as an SVG for finishing.

Statistics New Zealand: Visitor Arrivals by Every Country of Residence and Purpose (Annual-Dec) (2015)

- http://archive.stats.govt.nz/infoshare/ 