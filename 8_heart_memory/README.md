# Chapter Eight: Heart and Memory

Notes and data sources for each spread in the **Heart and Memory** chapter. Where programming was necessary to create a graphic, the code is provided in a sub-folder.

---

## 801 Ingoa Wāhi o Aotearoa / Place Names of New Zealand
This map was created using Te Hiku Media’s open-source ngā-kupu Māori language processing library. The map is heavily based on work by Max Bunting and William Ti’iti’i Asiata, Te Pūnaha Matatini student scholars during the 2017–18 summer, while they interned at Dragonfly Data Science. 

The map was produced by running ngā-kupu’s kōmiri_kupu function over every entry in the Land Information New Zealand Gazetteer of Place Names. The only adjustment we made to the Te Hiku/Bunting/Dragonfly code was to shuffle the resulting CSV file, which was sorted alphabetically by place name, into a random order. This was done to avoid words from one language systematically obscuring words from another language when plotting dots in dense areas due to the different lexical structures of English and Māori words. We imported the CSV file into QGIS for rough styling and exported the draft maps to SVG for finishing in Adobe Illustrator.

Land Information New Zealand: New Zealand Gazetteer of Place Names (2018)

- https://www.linz.govt.nz/regulatory/place-names/find-place-name/new-zealand-gazetteer-place-names

Te Hiku Media: Ngā-kupu Tools to Identify Māori Words in Text (2018)

- https://github.com/TeHikuMedia/nga-kupu

## 802 Vowels and Consonants

The Ministry for Culture and Heritage supplied plaintext copies of the Māori and English editions Te Ara. We wrote a Python script that used the ngā-kupu module to find unique Māori and English words within each text, compiling them into a pair of lists.

We wrote a Python script to examine each word and score the cumulative frequency that any given consonant or vowel appears at different positions within a word. The frequency area charts were drafted in R with ggplot2 and finished in Adobe Illustrator.

Ministry for Culture and Heritage: Te Ara — The Encyclopedia of New Zealand (2016)

- https://teara.govt.nz/en
- https://teara.govt.nz/mi

Te Hiku Media: Ngā-kupu Tools to Identify Māori Words in Text (2018)
https://github.com/TeHikuMedia/nga-kupu

## 803 Musical Timeline

We wrote a Python script that uses Beautiful Soup to harvest all artists from the AudioCulture website and save them into a spreadsheet. We then worked with Gareth Shute, an AudioCulture contributor, to date each artist and classify them into a genre. This involved reading every AudioCulture biography and cross-referencing material against Discogs and other information sources. We only included performers and excluded people who were primarily promoters, journalists, engineers or involved in other non-performing roles.

The final visualisation was created using a custom D3.js script and fine-tuned in Adobe Illustrator.

AudioCulture: People Index (2019)

- https://www.audioculture.co.nz/index/people

## 804 Aotearoa Song Map
This spread is based on data from a mapping project by RNZ Music. RNZ Music asked listeners to submit songs with lyrics about Aotearoa. Their staff produced a curated list of songs, geolocated them and shared the results as a custom Google Map.

We downloaded the data from Google Maps as a KML file and produced a draft map with QGIS. The final map was created in Adobe Illustrator at a cartographic scale of 1:3,000,000 and projected in NZTM2000.

RNZ Music: New Zealand Song Map

- https://www.radionz.co.nz/national/programmes/nat-music/audio/2018673890/nz-song-map-songs-about-new-zealand-places 

## 805 Names Etched In Stone

We downloaded the memorials register from the Ministry for Culture and Heritage website as a KML file. The maps were drafted in QGIS and labelled in Adobe Illustrator.

Ministry for Culture and Heritage: Memorials Register (2019)

- https://nzhistory.govt.nz/culture/the-memorials-register

## 806 Tūpuna Maunga

This map blends a slope surface with a shaded relief layer. Both layers were created using GDAL from a 1-metre DEM captured for Auckland City Council by NZ Aerial Mapping & Aerial Surveying Limited. The map was created in QGIS in NZTM2000 at a cartographic scale of 1:50,000. We added labels by hand in Adobe Illustrator.

It should be noted that this map only highlights the maunga returned to iwi as part of the Ngā Mana Whenua o Tāmaki Makaurau Collective Redress Act 2014. There are other tūpuna maunga that did not return to mana whenua. 

Tūpuna Maunga o Tāmaki Makaurau Authority: Tūpuna Maunga Significance and History

- https://www.aucklandcouncil.govt.nz/about-auckland-council/how-auckland-council-works/kaupapa-maori/comanagement-authorities-boards/tupuna-maunga-tamaki-makaurau-authority/Pages/tupuna-maunga-significance-history.aspx

Auckland Council: Auckland LiDAR 1m DEM (2013)

- https://data.linz.govt.nz/layer/53405-auckland-lidar-1m-dem-2013/

## 807 Te Urewera

The land cover data is a reclassification of Manaaki Whenua’s land cover database (LCDB) version 4.1. We used GDAL to derive slope and hill shading raster layers from Manaaki Whenua’s 25-metre NZDEM digital elevation models. We created a series of CartoCSS style rules for the simplified land cover, slope and shaded relief in TileMill before rendering the maps directly with Python and Mapnik in NZTM2000.

The final map is a composite of the shaded terrain overlaid with Tūhoe boundaries in Adobe Illustrator. The map is projected in NZTM2000 at a cartographic scale at a scale of 1:300,000.

Ngāi Tūhoe: Map of Te Urewera (2019)

- http://www.ngaituhoe.iwi.nz/te-urewera-map

Manaaki Whenua — Landcare Research: Land Cover Database Version 4.1 (2015)

- https://lris.scinfo.org.nz/layer/48423-lcdb-v41-land-cover-database-version-41-mainland-new-zealand/

Manaaki Whenua — Landcare Research: NZDEM North Island 25 metre (2010)

- https://lris.scinfo.org.nz/layer/48131-nzdem-north-island-25-metre/

## 808 Whanganui
We isolated the Whanganui tributaries by performing a spatial intersect operation against its Order 7 catchment boundary. We composed the basemap in QGIS and exported it as an SVG to Adobe Illustrator. The final map has a cartographic scale of 1:600,000 and is projected in NZTM2000.

Ministry for the Environment: River Environment Classification (2010)

- https://data.mfe.govt.nz/layer/51845-river-environment-classification-new-zealand-2010/

Ministry for the Environment: River Environment Classification Catchment Order 7 (2010)
https://data.mfe.govt.nz/layer/52361-river-environment-classification-catchment-order-7-2010/

## 809 Without People

The land cover data is a simplified reclassification of Manaaki Whenua’s ‘Potential Vegetation of New Zealand’ vector layer, which predicts likely forest composition from distributions of tree species and environmental variables. We used GDAL to derive slope and hill shading raster layers from Manaaki Whenua’s 25-metre NZDEM digital elevation models. We created a series of CartoCSS style rules for the simplified land cover, slope and shaded relief in TileMill before rendering the maps directly with Python and Mapnik in NZTM2000. 

The final map was labelled in Adobe Illustrator and is presented in NZTM2000 at a cartographic scale of 1:3,000,000.

Manaaki Whenua — Landcare Research: Potential Vegetation of New Zealand (2012)

- https://lris.scinfo.org.nz/layer/48289-potential-vegetation-of-new-zealand/

Manaaki Whenua — Landcare Research: NZDEM North Island 25 metre (2010)

- https://lris.scinfo.org.nz/layer/48131-nzdem-north-island-25-metre/
