library(dplyr)
library(tidyr)
library(ggplot2)

df <- read.csv("data/nz_census_population_estimates.csv") %>%
  select(-c(Infoshare.annual.est.as.at..Annual.Jun., Infoshare.annual.est.Mean.year.ended..Annual.Jun., Form, Notes)) %>%
  mutate(date = paste0(Year, "-06-30"))  %>%
  mutate(date = as.Date(date, "%Y-%m-%d"))

print(head(df))

census = df %>%
  filter(European.Census %in% c('C', 'Y') | Combined.Census %in% c('C', 'Y') ) %>%
  unite(euro_māori_combo, European.Census, Māori.Census, Combined.Census, sep="|")

print(head(census))

p <- ggplot(df, aes( date, Book.pop)) +
  geom_area(fill="steelblue") +
  scale_x_date(minor_breaks = "10 year") +
  scale_y_continuous(labels = scales::comma) +
  geom_vline(xintercept = as.Date("1914-07-14"), color="gray30") +
  geom_vline(xintercept = as.Date("1918-11-11"), color="gray30") +
  geom_vline(xintercept = as.Date("1939-09-01"), color="gray30") +
  geom_vline(xintercept = as.Date("1945-09-02"), color="gray30") +
  theme_minimal() +
  geom_point(data=census, aes(colour=euro_māori_combo))

print(p)