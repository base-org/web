#!/bin/bash
set -e

# check if envmapper is loaded
if [ -f /envmapper/mapper.env ];  then
  source /envmapper/mapping.env
fi

exec node server.js