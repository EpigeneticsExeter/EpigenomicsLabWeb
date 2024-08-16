#!/bin/bash

SCRIPTS_DIR="$(realpath "$(dirname "$0")")"
OPPORTUNITIES_DATA="$SCRIPTS_DIR/../assets/data/opportunities.json"
PYTHON_DIR="$SCRIPTS_DIR/processing_scripts/"

## ====================== ##
##   GATHER INFORMATION   ##
## ====================== ##

echo "Enter the change type (add/change/remove):"
read -r change_type

## ======== ##
##   MAIN   ##
## ======== ##

python \
    "${PYTHON_DIR}/edit_opportunities.py" \
    "${OPPORTUNITIES_DATA}" \
    "${change_type}" \
