# Chapter Five: People

Notes and data sources for each spread in the **People** chapter. Where programming was necessary to create a graphic, the code is provided in a sub-folder.

---

## 501 Counting People

The population line chart is based on two Statistics New Zealand datasets. Population totals up to 2010 come from the New Zealand Long Term Data Series. Population for 2010 through to 2018 come from Infoshare's residential population estimates. The chart was created in R using ggplot2 (`501_counting_people/viz_census_history.R`).

Annotations are mostly sourced from Statistics New Zealand's [History of Census-taking in New Zealand](http://archive.stats.govt.nz/Census/2013-census/info-about-the-census/intro-to-nz-census/history.aspx) resource. Notes on the history of wording about race and ethnicity in the census are from Paul Callister's 2011 article [The Construction of Ethnicity and "Belonging" in New Zealand: Where We Have Come From and Where We Might be Going](https://search.informit.com.au/documentSummary;dn=315948902859049;res=IELNZC) in the Journal of New Zealand Studies. We added annotations manually in Adobe Illustrator.

Statistics New Zealand: New Zealand Long Term Data Series, A1.1 Total Population (2010)

- http://archive.stats.govt.nz/browse_for_stats/economic_indicators/NationalAccounts/long-term-data-series/population.aspx

Statistics New Zealand: Infoshare, Population, Population Estimates (DPE), Estimated Resident Population by Age and Sex (1991+) Annual-Jun (2018)

- http://archive.stats.govt.nz/infoshare/Default.aspx

Statistics New Zealand: A History of Census-taking in New Zealand (2013)

- http://archive.stats.govt.nz/Census/2013-census/info-about-the-census/intro-to-nz-census/history/history-summary.aspx

## 502 Where Were You Born?

This map was created with 2001 and 2013 data from the New Zealand census. We arranged the countries in QGIS but performed all symbol resizing and fine-tuning in Adobe Illustrator. Proportional circles are sized using the following formula:

```
symbol_size = SQRT(value /max_domain_value) * max_symbol_size
```

Statistics New Zealand: Birthplace (Detailed), for the Census Usually Resident Population Count, 2001, 2006, and 2013 (RC, TA) (2013)

- http://nzdotstat.stats.govt.nz/

## 503 Becoming Citizens

The original source data for this chart was the Department of Internal Affairs Statistics for New Zealand Citizenship. We used a treatment of this data from Figure.NZ, which accounts for countries that no longer exist or have been renamed (for example data for Ceylon is counted for Sri Lanka).

We found the top 16 countries using a custom R script (`503_becoming_citizens/viz_citizens.R`). The chart was created in R using the [Streamgraph](https://hrbrmstr.github.io/streamgraph/) package. It was exported as a PDF and labelled in Adobe Illustrator.

Department of Internal Affairs: Statistics for New Zealand Citizenship (2019)

- https://www.dia.govt.nz/diawebsite.nsf/wpg_URL/Services-Citizenship-Citizenship-Statistics

Figure.nz : Citizenship — Granted Citizenship by Country 1949–2018 (2019)

- https://figure.nz/table/SAPZS8Du5oMmns85 

## 504 Faith and Religion

These slope charts were created from New Zealand census counts using a custom D3.js script (`504_faith_religion/script.js`). The data is presented on a logarithmic scale in order to ensure all faiths could be represented. A helpful side-effect of this decision is that the percentage slope angles are directly comparable. For example, a 17 per cent increase will always be drawn at the same angle, irrespective of how big or small the religion's count is.

Presbyterian includes congregational and reformed Presbyterians. 'Other religion (not further defined)' and 'Other other religion' are combined into a single 'Other religion' category.

Statistics New Zealand: Religion in New Zealand Quick Stats (2013)

- http://archive.stats.govt.nz/Census/2013-census/profile-and-summary-reports/quickstats-culture-identity.aspx 

## 505 Te Reo Māori Speakers

These maps were created using 'languages spoken' census data at the 'area unit' level. We pre-processed the language table using R's dplyr package to calculate the percentage of people in each area unit with conversational te reo Māori skills (`505_te_reo_māori_speakers/prep_te_reo_data.R`). We joined the resulting CSV to the area unit boundaries in QGIS and composed the initial map views. These drafts were exported as PDFs and finished in Adobe Illustrator.

Statistics New Zealand: Languages Spoken (Total Responses) by Age Group and Sex, for the Census Usually Resident Population Count, 2001, 2006, and 2013 Censuses (RC, TA, AU) (2013)

- http://nzdotstat.stats.govt.nz/

Statistics New Zealand: Geographic Boundary Files (2013)

- http://archive.stats.govt.nz/browse_for_stats/Maps_and_geography/Geographic-areas/digital-boundary-files.aspx


## 506 Fields of Study

These bar charts were drafted using a custome D3.js script (`506_fields_study/script.js`) and finished in Adobe Illustrator. 

Ministry of Education: Provider-based Enrolments: The Predominant Field of Study of Students at Tertiary Education Providers (2018)

- https://www.educationcounts.govt.nz/statistics/tertiary-education/participation

## 507 What People Do

This pictogram chart was created using Statistics New Zealand's Household Labour Force Survey for the December 2018 quarter. The graphic combines totals from two Statistics New Zealand reports. The 'not in the labour force' totals come from a Household Labour Force Survey table titled 'Not in LF by Sex by Reason for Not Wanting Work' for the quarter ending December 2018. The 'labour force' totals come from Table 9 of the Household Labour Force Survey December 2018 overview statistics.

We explored the data using a treemap visualisation. We created the final graphic directly in Adobe Illustrator.

Statistics New Zealand: Work and Spending, Household Labour Force Survey
Not in LF by Sex by Reason for Not Wanting Work (Qrtly-Mar/Jun/Sep/Dec): December 2018 quarter (2018)

- http://archive.stats.govt.nz/infoshare/

Statistics New Zealand: Household Labour Force Survey Overview Statistics: December 2018 Quarter, Table 9: People Employed By Industry and Sex (2018)

- https://www.stats.govt.nz/information-releases/labour-market-statistics-december-2018-quarter 

Statistics New Zealand: Labour Force Status by Sex by Age Group: December 2018 Quarter (2018)

- http://archive.stats.govt.nz/infoshare/ViewTable.aspx?pxID=a5efe63a-0446-4caf-884d-ab4e1016a213 

Statistics New Zealand: Persons Employed by Sex by Industry, ANZSIC06: December 2018 Quarter (2018)

- http://archive.stats.govt.nz/infoshare/ViewTable.aspx?pxID=eddc0234-20d0-4917-8e7d-0ed00031fc42

## 508 Income Gaps

We downloaded salary data from Statistics New Zealand for people in full-time employment in 2018. We calculated average annual salaries by multiplying median hourly earnings by 37.5 hours per week by 365 days per year. We wrote a Python script to determine what day of the year each demographic group and occupation should fall on, relative to the earnings of a Pacific woman (`508_income_gaps/parse_income_dates.py`).

We laid the final spread out as a calendar in Adobe Illustrator.

Statistics New Zealand: Income, Incomes Tables, Earnings from Wage and Salary Jobs by Sex, Age Groups, Ethnic Groups, and Full-time and Part-time Status (2018)

- http://nzdotstat.stats.govt.nz/wbos/index.aspx 

Trade Me Jobs: Salary Guide (2018)

- https://www.trademe.co.nz/jobs/salary-guide

## 509 Child Poverty

These dot charts were created directly in Adobe Illustrator.

Statistics New Zealand: Child Poverty Statistics: Year Ended June 2018

- https://www.stats.govt.nz/information-releases/child-poverty-statistics-year-ended-june-2018

## 510 Accidents and Injuries

This data comes from the Injury table in the 2016 Ministry of Health publication 'Publicly Funded Hospital Discharges' (2016). The ministry describes injuries and accidents using the fine-grain descriptions from the 'International Statistical Classification of Diseases and Related Health Problems' at the level of District Health Boards. We wrote a Python script to aggregate the fine descriptions into broad categories at the national scale. We created a D3.js visualisation (`510_accidents_injuries/script.js`) and exported it as an SVG for finishing in Adobe Illustrator.

Note that these charts were created while Chris went through a phase of using [d3-jetpack](https://github.com/gka/d3-jetpack), so the D3.js syntax may look a little weird.

Ministry of Health: Publicly Funded Hospital Discharges — 1 July 2013 to 30 June 2014 (2016)

- https://www.health.govt.nz/nz-health-statistics/health-statistics-and-data-sets/publicly-funded-hospital-discharges-series

## 511 How We Die

We downloaded 11 years of mortality data from the Ministry of Health and wrote an R script to find average annual death rates for each sex and age group. We created the chart in R using the ggplot2 (`511_how_we_die/viz_death.R`). We labelled and coloured the chart in Adobe Illustrator.

This visualisation was directly inspired by Nathan Yau's 2016 [Causes of Death interactive](https://flowingdata.com/2016/01/05/causes-of-death/) on the FlowingData website.

Ministry of Health: Mortality Data Tables (2006–2016)

- https://www.health.govt.nz/nz-health-statistics/health-statistics-and-data-sets/mortality-data-and-stats 
