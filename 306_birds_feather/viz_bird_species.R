library(tidyr)
library(ggplot2)
library(dplyr)

df1 <- read.csv("data/osnz_nz_1.csv")
df2 <- read.csv("data/osnz_nz_2.csv")
df3 <- read.csv("data/osnz_chathams.csv")
df4 <- read.csv("data/osnz_blanks.csv")

nzbo <- read.csv("data/bird_nz_status.csv") # load the nice NZBO table

birds <- rbind(df1, df2, df4)

bird_name = "Morepork"

sel_bird <- inner_join(birds, nzbo) %>%
  group_by(grid2) %>%
  summarize(ans = any(taxa.name == bird_name)) %>%
  separate(grid2, c("east", "north"), sep = ":", convert = TRUE)

sel_bird$east =  sel_bird$east  * 10000
sel_bird$north = sel_bird$north * 10000

write.csv(sel_bird, paste0("data/dist_", paste0(bird_name), ".csv"))

p <- ggplot(sel_bird, aes(east, north)) +
  geom_point(aes(colour = ans), show.legend = TRUE) +
  scale_color_manual(values=c("#ececec", "#BA4031"))+
  theme_ipsum(grid=F) +
  coord_fixed()

print(p)