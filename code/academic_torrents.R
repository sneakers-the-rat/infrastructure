library(tidyverse)
library(here)
library(lubridate)
library(sitools)
here::i_am('code/academic_torrents.R')

dl <- read_csv(here('data', 'torrent_daily_stats.csv'))

# filter to the final year of data, removing the final day because it was incomplete
dl_filter <- dl %>% filter(date>=max(date)-years(1), date < max(date))

ggplot(dl) + 
  geom_line(aes(x=date, y=cumsum(size)))+
  scale_y_continuous(labels=f2si)

# calculate comparable AWS bandwidth costs
# use GB rather than gibibytes
gb_downloaded <- sum(dl$size)/1e9
aws_cost <- 0.05 * gb_downloaded


# -----------
# count dead torrents
seeds <- read_csv(here('data', 'times_completed.csv'))

ggplot(seeds)+
  geom_point(aes(x=times_completed+1, y=seeders+1))+
  scale_x_log10()+
  scale_y_log10()
