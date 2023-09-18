#!/bin/sh

utc="$(TZ=UTC date +"%H:%M")"
colorado="$(TZ=America/Denver date +"%I:%M %p")"
philly="$(TZ=America/New_York date +"%I:%M %p")"
seattle="$(TZ=America/Los_Angeles date +"%I:%M %p")"
local="$(date +"%A %Y-%m-%d %H:%M")"
printf "%s UTC | %s PST | %s MST | %s EST | %s Local\n" "$utc" "$seattle" "$colorado" "$philly" "$local"
