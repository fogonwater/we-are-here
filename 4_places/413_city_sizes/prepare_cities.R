library(dplyr)
library(tidyr)

wide_cities <- read.csv('data/nz_local_pop_db_cities.csv')

long_counts <- gather(wide_cities, year, count, X1891:X2018, factor_key=TRUE) %>%
  mutate(year=extract_numeric(year))

# create ranks for each city by year
for (year_col in names(wide_cities)[-1]) {
  rank_col <- paste('rank', year_col, sep="")
  #wide_cities[,rank_col] <-  order(wide_cities[,year_col], decreasing = T)
  wide_cities[,rank_col] <-  rank(desc(wide_cities[,year_col]))
}

long_ranks <- gather(wide_cities, year, rank, rankX1891:rankX2018, factor_key=TRUE) %>%
  mutate(year=extract_numeric(year))

long_counts$rank <- long_ranks$rank

write.csv(long_counts, file = "data/long_cities.csv",row.names=FALSE)