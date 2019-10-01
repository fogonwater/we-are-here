library(dplyr)
library(tidyr)

obs <- read.csv("data/TABLECODE8067_Data_1274bb5f-0245-493b-ad56-e45a8fd04bb4.csv") %>%
  select(au_code=AREA, au_name=Area, language=Languages.spoken, year=Year, count=Value)  %>%
  mutate(language=substr(language, 1, 6)) %>%
  mutate(language=gsub(" ", "", language)) %>%
  unite(lang_year, language, year)

te_reo_props <- spread(obs, lang_year, count)  %>%
  mutate(per_01=Maori_2001/Total_2001)  %>%
  mutate(per_06=Maori_2006/Total_2006)  %>%
  mutate(per_13=Maori_2013/Total_2013)

write.csv(te_reo_props, "data/te_reo_proportions_2001_2006_2013.csv", row.names = FALSE)