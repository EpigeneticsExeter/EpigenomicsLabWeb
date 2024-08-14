#!/bin/bash

SCRIPTS_DIR="$(realpath "$(dirname "$0")")"
PEOPLE_DATA="$SCRIPTS_DIR/../assets/data/people.json"
IMAGES_DIR="$SCRIPTS_DIR/../assets/images/profile_pictures"
PYTHON_DIR="$SCRIPTS_DIR/processing_scripts/"

## ====================== ##
##   GATHER INFORMATION   ##
## ====================== ##

echo "Enter the change type (add/change/remove):"
read -r change_type

echo "Enter the person's name:"
read -r name
if [[ -z "${name}" ]]; then echo "name not given."; exit 1; fi

lower_case_name=$(echo "${name}" | tr '[:upper:]' '[:lower:]')
concatenated_name=$(echo "${lower_case_name}" | tr -d ' ')
capitalized_name=$(\
    echo "${lower_case_name}" | \
    awk \
    '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1' \
)

profile_picture_path="$(find "$IMAGES_DIR" -name "${concatenated_name}*")"

if [[ -z "${profile_picture_path}" ]]; then
cat << EOF
ERROR: No profile picture exists for ${capitalized_name}.
You need to add the person's profile picture into ${IMAGES_DIR} under the name:
${concatenated_name}.(jpg/png/...)

This is to simplify code for the blog pages of the website.
EOF
    exit 1
fi

profile_picture="$(basename "${profile_picture_path}")"

## ======== ##
##   MAIN   ##
## ======== ##

python \
    "${PYTHON_DIR}/edit_people.py" \
    "${PEOPLE_DATA}" \
    "${change_type}" \
    "${capitalized_name}" \
    "${profile_picture}"