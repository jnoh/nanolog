#!/usr/bin/env bash

DATE=`date '+%Y%m%d%H%M%S'`
FILE=./migrations/$DATE-$1.sql

cat > $FILE << EOF
-- Up

-- Down

EOF
