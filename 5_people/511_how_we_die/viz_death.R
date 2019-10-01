library(dplyr)
library(tidyr)
library(stringr)
library(ggplot2)

#show_cat = "Total:"
show_cat = "Female:"
#show_cat = "Male:"

df <- read.csv("data/MOH_mortality_averages.csv") %>%
  filter(sex != "")  %>%
  filter(sex == show_cat) %>%
  gather(age, value, age_0:age_85) %>%
  mutate(age = as.numeric( str_replace(age, "age_", "" )))

print(head(df))

# sum up years by age and cause group
df <- df %>%
  group_by(age, cause_label) %>%
  summarize(value = sum(value))

# calculate propoportions of causes at year level
# https://stackoverflow.com/a/29551416
df2 = df  %>%
  group_by(age) %>% 
  mutate(prop=round(value/sum(value)*100, 2)) %>% 
  ungroup

df2$labels = factor(df2$cause_label, levels=levels(df2$cause_label)[c(9,6,10,3,8,4,11,2,5,1,7)])

print(tail(df2))

wide_df <- df2 %>%
  select(-value, -labels) %>%
  spread(cause_label, prop)

#write.csv(wide_df, file = paste0("data/wide_", substring(show_cat, 1,4), ".csv"), row.names=FALSE)
#print(tail(wide_df))

p <- ggplot(df2, aes(x=age, y=prop, fill=labels)) +
  geom_area(size=.2, colour="#444444") +
  ggtitle(paste(show_cat, "deaths by age (%)")) +
  scale_fill_brewer(palette="Set3") +
  theme_bw()

print(p)