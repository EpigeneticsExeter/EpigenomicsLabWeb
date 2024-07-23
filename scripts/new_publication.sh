#!/bin/bash

PUBLICATION_DIR="$(dirname "$0")/../content/publications"
PYTHON_DIR="$(dirname "$0")/processing_scripts/"

cat << EOF
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
+ PUBLICATION CREATOR             +
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
+ Answer the following questions  +
+ and just hit enter ↳ for N/A    +
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

EOF

## ====================== ##
##   GATHER INFORMATION   ##
## ====================== ##

eco "Enter file name (otherwise this will default to a truncation of the title)"
read -r file_path

echo "Enter the publication title:"
read -r title
if [[ -z "${title}" ]]; then echo "no title given"; fi

echo "Enter the publication's authors (comma separated list):"
read -r authors

echo "Enter the publication's journal:"
read -r journal

echo "Enter the publication date:"
read -r date

echo "Enter a link to an online host for the publication:"
echo "(DOI is reccomended)"
read -r link

echo "Enter any GEO accession numbers (on one line):"
read -r geo

## ================ ##
##   DATE PARSING   ##
## ================ ##

formatted_date=$(python "${PYTHON_DIR}/date_parse.py" "${date}")
if [[ -z "${formatted_date}" ]]; then 
    echo "Could not recognise ${date} as a proper date. Please try harder."
    exit 1
fi

## =============== ##
##   GEO PARSING   ##
## =============== ##

if [[ -n "${geo}" ]]; then 
    formatted_geo=""
else
    formatted_geo=$(python "${PYTHON_DIR}/geo_parse.py" "${geo}")
fi

## =================== ##
##   FILE PATH CHECK   ##
## =================== ##

if [[ -z "${file_path}" ]]; then
    concatenated_title="$(echo "${title}" | tr -d ' ')"
    truncated_title="${concatenated_title::12}"
    file_path="${PUBLICATION_DIR}/${truncated_title}.md"
fi

## ============== ##
##   GENERATION   ##
## ============== ##


cat > "${file_path}" << EOF
+++
title = "${title}"
authors = "${authors}"
journal = "${journal}"
date = "${formatted_date}"
[ params ]
    link = "${link}"
    geo_numbers = "${formatted_geo}"
+++
EOF
