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
WARNING: No profile picture exists for ${capitalized_name}.

As a result a default picture will be used.

If this is not desired, you need to add the person's profile picture into
${IMAGES_DIR} under the name:
${concatenated_name}.(jpg/png/...)

After doing this, re-run this script.

This is to simplify code for the blog pages of the website.
EOF
fi

if [[ -n "${profile_picture_path}" ]]; then
    pp_size=$(du "${profile_picture_path}" | awk '{print $1}')
    if [[ "${pp_size}" -gt 200 ]]; then
cat << EOF
WARNING: Please do not use large images for your profile picture as it slows
the site down (the image will be small anyways so you can't even view the
higher quality). 
Currently your image has size: $pp_size KB
We recommend gettting this below 200KB. There are various tools online to help
with this.
EOF
    fi
fi


## ======== ##
##   MAIN   ##
## ======== ##

if command -v python > /dev/null; then
    python \
        "${PYTHON_DIR}/edit_people.py" \
        "${PEOPLE_DATA}" \
        "${change_type}" \
        "${capitalized_name}"
else
cat << EOF

ERROR: Could not find Python on your PATH. 
Python is required for this script to work, make sure it is installed first.
EOF
fi
