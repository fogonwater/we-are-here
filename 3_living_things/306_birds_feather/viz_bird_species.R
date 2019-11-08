library(tidyr)
library(ggplot2)
library(dplyr)

# specify a bird of interest
bird_name = "Morepork"

# load source data, including a csv of "blanks" to fill holes in land
df1 <- read.csv("data/osnz_nz_1.csv")
df2 <- read.csv("data/osnz_nz_2.csv")
df3 <- read.csv("data/osnz_chathams.csv")
df4 <- read.csv("data/osnz_blanks.csv")

# group all observations by grid coordinate,
# then summarise on whether named bird was ever observered there
sel_bird <- rbind(df1, df2, df4) %>%
  group_by(grid2) %>%
  summarize(ans = any(taxa.name == bird_name)) %>%
  separate(grid2, c("east", "north"), sep = ":", convert = TRUE)

# scale easting/northing correctly
sel_bird$east =  sel_bird$east  * 10000
sel_bird$north = sel_bird$north * 10000

# write to a csv named after the bird
write.csv(sel_bird, paste0("data/species/", paste0(bird_name), ".csv"))

# make a plot to see the output
p <- ggplot(sel_bird, aes(east, north)) +
  geom_point(aes(colour = ans), show.legend = FALSE) +
  scale_color_manual(values=c("#ECECEC", "#BA4031"))+
  theme_minimal() +
  coord_fixed()

print(p)
