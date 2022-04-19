#! /bin/bash

rsync -avzhP --delete ~/personalprojects/philpott-law/client/_site/ root@a.philpott.io:/srv/philpott-law.com/



# response=$(curl -s "Accept: text/plain" https://api.philpott-law.com/health)

