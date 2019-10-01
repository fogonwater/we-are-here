library(dplyr)
library(tidyr)
library(ggplot2)
library(hrbrthemes)

library(streamgraph)


num_tot_cats = 16

df <- read.csv("data/Citizenship_Granted_citizenship_by_country_19492018.csv") %>%
  rename(Country = Country.of.birth) %>%
  filter(Country != "TOTAL") %>%
  filter(Country != "New Zealand") %>%
  select(-Null.Reason, -Value.Unit, -Value.Label) %>%
  mutate(Country = recode(
    Country, "Siam" = "Thailand",
    "Australia" = "00 Australia",
    "Tonga" = "00 Tonga",
    "Virgin Islands of the U.S." = "00 USA",
    "United States of America" = "00 USA",
    "Cambodia" = "01 Cambodia",
    "Iraq" = "01 Iraq",
    "Sri Lanka" = "02 Sri Lanka",
    "Taiwan" = "03 Taiwan",
    "South Korea" = "04 South Korea",
    "Philippines" = "05 Philippines",
    "India" = "06 India",
    "China (including Hong Kong and Macau)" = "07 China",
    "United Kingdom" = "08 UK",
    "Samoa" = "09 Samoa",
    "South Africa" = "10 South Africa",
    "Fiji" = "11 Fiji",
    "The Netherlands" = "16 Netherlands"
  )) %>%
  arrange(Year, Country)

# extract the top n countries

top_countries <- df %>%
  group_by(Country) %>%
  summarize(total = sum(Value)) %>%
  mutate(label=Country) %>%
  top_n(num_tot_cats, total) %>%
  arrange(total)

print(top_countries)

# join top countries to dataset and then summarise by country label and year
# aim is to sum up the new "Other" label
df <- df %>%
  left_join(top_countries) %>%
  group_by(Year, label) %>%
  summarize(Value = sum(Value))

write.csv(df, file = "data/top_citizen_source_countries_subset.csv", row.names=FALSE)
df <- read.csv("data/top_citizen_source_countries_subset.csv")

# Use one of the following commands in the console to create a visualisation

#streamgraph(df, key="label", value="Value", date="Year" , offset="silouhette",  interactive=TRUE)
#streamgraph(df, key="label", value="Value", date="Year" , offset="silhouette",  interactive=FALSE)
