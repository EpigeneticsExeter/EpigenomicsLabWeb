#!/bin/bash

SCRIPTS_DIR="$(realpath "$(dirname "$0")")"
PROCESSED_PUBLICATION_DATA="$SCRIPTS_DIR/../assets/data/publications.json"
REPO_DIR=$(realpath "$SCRIPTS_DIR/../")
PYTHON_DIR="$SCRIPTS_DIR/processing_scripts/"

raw_publication_data=$(find "${REPO_DIR}" -name "*.csv")

if [[ -z "${raw_publication_data}" ]]; then
    echo "ERROR No .csv files found in ${REPO_DIR}."
fi

cat << EOF
Found these raw bibliographies: 

${raw_publication_data}

Please copy and paste the one you want to use with the publications page
then hit enter.

EOF

read -r bibliography_path

if [[ -f "${bibliography_path}" ]]; then
    columns=$(head -n 1 "${bibliography_path}")
    if [[ "${columns}" =~ ",,,,,,,,," ]]; then
cat << EOF

[0;31m
WARNING: It doesn't look like the top line of:
$bibliography_path 
is a header line. If the file is fine, please continue. 
Would you like to continue? (y/n) [0m
EOF
    read -r continue
    if [[ "${continue}" != "y" ]]; then exit 0; fi

fi

    column_names=$(head -n 1 "${bibliography_path}" | sed 's/,/\n/g')

cat << EOF

The following column names were found in the selected file:
Please copy and paste these entries into the questions below.

$column_names

EOF
echo "Please give the name of a suitable id column (might be under Publication ID):"
    read -r id
    echo "Please give the name of the doi column:"
    read -r doi
    echo "Please give the name of the abstract column:"
    read -r abstract
    echo "Please give the name of the journal column (might be under Source title):"
    read -r journal
    echo "Please give the name of the title column:"
    read -r title
    echo "Please give the name of the author column:"
    read -r author
    echo "Please give the name of the date column:"
    read -r date

    
    python "${PYTHON_DIR}/csv_to_json.py" \
        "${bibliography_path}" \
        "${PROCESSED_PUBLICATION_DATA}" \
        "${id}" \
        --input_fields "${doi},${abstract},${journal},${title},${author},${date}" \
        --output_fields "doi,abstract,journal,title,author,date"

    if eval python "${PYTHON_DIR}/change_date_format.py" "${PROCESSED_PUBLICATION_DATA}"; then
        echo "Completed successfully"
    fi

else
echo "ERROR: ${bibliography_path} does not exist. Make sure you typed it correctly"
fi


