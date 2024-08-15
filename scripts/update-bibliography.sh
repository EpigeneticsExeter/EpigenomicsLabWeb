#!/bin/bash

SCRIPTS_DIR="$(realpath "$(dirname "$0")")"
PROCESSED_PUBLICATION_DATA="$SCRIPTS_DIR/../assets/data/publications.json"
REPO_DIR=$(realpath "$SCRIPTS_DIR/../")
PYTHON_DIR="$SCRIPTS_DIR/processing_scripts/"

raw_publication_data=$(find "${REPO_DIR}" -name "*.bib")

if [[ -z "${raw_publication_data}" ]]; then
    echo "ERROR No .bib files found in ${REPO_DIR}."
fi

cat << EOF
Found these raw bibliographies: 
${raw_publication_data}

Please copy and paste the one you want to use with the publications page
then hit enter.

EOF

read -r bibliography_path

if [[ -f "${bibliography_path}" ]]; then
    python "${PYTHON_DIR}/bibtex_to_json.py" \
        "${bibliography_path}" \
        "${PROCESSED_PUBLICATION_DATA}"
else
echo "ERROR: ${bibliography_path} does not exist. Make sure you typed it correctly"
fi


