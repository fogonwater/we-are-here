library(ggplot2)
library(tidyr)
library(dplyr)

tmeans = read.csv("data/station-series-1931-2018.csv", header = TRUE) %>% 
  filter(Locale != "Molesworth")

p <- ggplot(data=tmeans, aes(x=Year,y=Difference, fill=cut(Difference, c(-Inf,0,Inf)))) +
  geom_bar(stat="identity") +
  scale_fill_manual(values=c("steelblue", "tomato")) +
  facet_grid(Locale ~ .) +
  scale_x_continuous(breaks = seq(1950, 2000, 50), minor_breaks = seq(1930, 2220, 10)) +
  theme(
        legend.position="none",
        panel.background=element_blank(),
        panel.border=element_blank(),
        plot.background=element_blank(),
        panel.grid.major.x = element_line(colour = "#e4e4e4"),
        panel.grid.major.y = element_line(colour = "#f0f0f0"),
        panel.grid.minor.x = element_line(colour = "#f0f0f0"),
        strip.text.y = element_text(angle=0),
        strip.background = element_blank())

print(p)