#!/bin/bash
set -e

# check if envmapper is loaded
if [ -f /envmapper/mapping.env ];  then
    echo "Loading envmapper"
    source /envmapper/mapping.env
fi
env
exec node server.js