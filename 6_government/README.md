# Chapter Six: Government

Notes and data sources for each spread in the **Government** chapter. Where programming was necessary to create a graphic, the code is provided in a sub-folder.

---

## 601 History of Parliament

To create this visualisation we reviewed electoral commission records of historical elections and cross-referenced them to Wikipedia entries on New Zealand election results. We synthesised these materials into a spreadsheet recording MP party affiliation on a year-by-year basis. We wrote a D3.js script to read this data and plot a historical stream chart as an SVG. We imported the SVG into Adobe Illustrator for colouring and labelling.

Electoral Commission: General Elections 1890–1993 — Seats Won by Party (2018)

- http://www.elections.org.nz/events/past-events/general-elections-1890-1993

Wikipedia: Elections in New Zealand (2019)

- https://en.wikipedia.org/wiki/Elections_in_New_Zealand

Wikipedia: List of New Zealand By-elections (2019)

- https://en.wikipedia.org/wiki/

## 602 Te Reo Māori in Parliament

This chart was created from a corpus of te reo Māori that Te Hiku Media and Dragonfly Data Science derived from Hansard, the official record of New Zealand parliamentary debates. Text extraction and processing used the nga-tautohetohe Python module. We used the ngā-kupu module to score words as English or Māori.

We ran a secondary parser over the supplied CSV corpus to extract year data and correct common OCR scanning errors in the date numerals. A draft chart was created in D3.js and exported to SVG for finishing in Adobe Illustrator.

New Zealand Parliament: Historical Hansard (2018)

- https://www.parliament.nz/en/pb/hansard-debates/historical-hansard/

Te Hiku Media: Ngā-tautohetohe Extracting Māori Text from the New Zealand Hansard (2018)

- https://github.com/TeHikuMedia/nga-tautohetohe

Te Hiku Media: Ngā-kupu Māori Text Identification (2018)

- https://github.com/TeHikuMedia/nga-kupu

## 603 Government Bills and 604 Private Members’ Bills

To create these charts we wrote a custom piece of software using Python and the Beautiful Soup module. The software downloads every ‘Bill Details’ page from Parliament’s ‘All Bills’ directory and then uses Beautiful Soup to extract key metadata. This includes the bill’s title and the dates it passed through each stage. The software outputs a structured account of each bill’s history in JSON format. The visualisation was created using D3.js, exported to SVG and finished in Adobe Illustrator.

New Zealand Parliament: Bills (Proposed Laws) (2018)
https://www.parliament.nz/en/pb/bills-and-laws/bills-proposed-laws/all

## 605 The Nation’s Spending

We created a draft version of this dot chart using a custom D3.js script. We created the final layout and added captions in Adobe Illustrator.

New Zealand Treasury: Expenditure Data — Estimates of Appropriations 2018/19

- https://treasury.govt.nz/publications/ise/budget-2018-data-estimates-appropriations-2018-19

## 606 Capital City

We downloaded the physical addresses for all government agencies as a CSV file. We wrote a Python script that uses the Geocoder module to find the latitude and longitude for each address. We reviewed the results and manually geocoded missing entries.

We overlaid the resulting points on a map of Wellington building footprints in QGIS. This map was rotated and exported to Adobe Illustrator, where we added texture and labels. The final map is projected in NZTM2000 at a cartographic scale of 1:3500.

Govt.nz: Government Contact Details (2019)

- https://www.govt.nz/organisations/mail-merge/ 

Wellington City Council: Wellington City Building Footprints (2017)

- https://koordinates.com/layer/1474-wellington-city-building-footprints/

## 607 Navy, Air Force, Army

These pictogram charts were created directly in Adobe Illustrator from data from various New Zealand Defence Force online reports. Tim drew the icon silhouettes based on photographs of the vehicles and weapons.

New Zealand Defence Force: Personnel Summary (2019)

- http://www.nzdf.mil.nz/personnel-records/personnel-branch/

Royal New Zealand Navy: Meet the Fleet (2019)

- http://navy.mil.nz/mtf/

Royal New Zealand Air Force: Aircraft (2019)

- http://airforce.mil.nz/about-us/what-we-do/aircraft/default.htm

New Zealand Army: Our Army Capability (2019)

- http://www.army.mil.nz/our-capability/default.htm

## 608 Defence Deployments

We created this map in QGIS based on information in the Ministry of Defence’s deployments map. The map was captioned and finished in Adobe Illustrator.

Ministry of Defence: Deployments Map (2019)

- https://defence.govt.nz/what-we-do/diplomacy-and-deployments/deployment-map/

## 609 Restructuring Health

Creating this map involved transcribing and then geocoding historical hospital data from a 1985 National Health Centre end-of-year report. After locating all hospitals, we drafted the national maps and insets in QGIS. The final spread was compiled and finished in Adobe Illustrator.

This map was heavily influenced by Russell Kirkpatrick’s map of hospital closures in the Bateman Contemporary Atlas of New Zealand (1999).

Ministry of Health: Certified Public Hospitals (2019)

- https://www.health.govt.nz/your-health/certified-providers/public-hospital

National Health Statistics Centre: Hospital Management Data Year Ended March 1 1985 (1985)

- http://www.moh.govt.nz/notebook/nbbooks.nsf/0/5023F7C59EB71BB54C2565D7000E0D00?OpenDocument

## 610 Local Government

We created the basemap of territorial authorities in QGIS and exported it to Adobe Illustrator. The proportional symbols were scaled using the same formula used in Where Were You Born?. The linkages were manually drawn based on connections between territorial authorities and regions.

Department of Internal Affairs: Local Council Profiles by Region (2019)

- http://www.localcouncils.govt.nz/lgip.nsf/wpg_URL/Profiles-Councils-by-Region-Index 

Statistics New Zealand: Territorial Authority 2018 Generalised (2018)

- https://datafinder.stats.govt.nz/layer/92214-territorial-authority-2018-generalised/
