#!/bin/bash

SCRIPTS_DIR=$(realpath "$(dirname "$0")")
PEOPLE_DATA=$(realpath "$SCRIPTS_DIR/../assets/data/people.json")
IMAGES_DIR=$(realpath "$SCRIPTS_DIR/../assets/images/profile_pictures")
PYTHON_DIR=$(realpath "$SCRIPTS_DIR/processing_scripts/")

RED="[0;31m"
BLUE="[0;34m"
NO_COLOUR="[0m"

## ====================== ##
##   GATHER INFORMATION   ##
## ====================== ##

while [[ "${change_type}" != "add" && "${change_type}" != "change" && "${change_type}" != "remove" ]]; do
    echo "Enter the change type (add/change/remove):"
    read -r change_type
done

while [[ -z "${name}" ]]; do
    echo "Enter the person's name:"
    read -r name
done

## ========================== ##
##   OBTAIN PROFILE PICTURE   ##
## ========================== ##

lower_case_name=$(echo "${name}" | tr '[:upper:]' '[:lower:]')
concatenated_name=$(echo "${lower_case_name}" | tr ' ' '-')
capitalized_name=$(\
    echo "${lower_case_name}" | \
    awk \
    '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1' \
)

profile_picture_path="$(find "$IMAGES_DIR" -name "${concatenated_name}*")"

## ====================================== ##
##   ERROR LOGGING FOR PROFILE PICTURES   ##
## ====================================== ##

if [[ "${change_type}" == "add" ]]; then
if [[ -z "${profile_picture_path}" ]]; then
cat << EOF
${RED}
WARNING: No profile picture exists for ${capitalized_name}.
${NO_COLOUR}
As a result a default picture will be used.

If this is not desired, you need to add the person's profile picture into
${IMAGES_DIR} under the name:
${concatenated_name}.(jpg/png/...)

This is to simplify code for the blog pages of the website.
EOF

else
cat << EOF
${BLUE}
INFO: Found the following profile picture for ${capitalized_name}:
${profile_picture_path}
PLEASE CHECK THAT THIS IS CORRECT
${NO_COLOUR}
EOF
    picture_size=$(stat -c %s "${profile_picture_path}")
    two_hundred_kilobytes=204800
    if [[ "${picture_size}" -gt "${two_hundred_kilobytes}" ]]; then

cat << EOF
${RED}
WARNING: Please do not use large images for your profile picture as it slows
the site down (the image will be small anyways so you can't even view the
higher quality). 
Currently your image has size: $pp_size KB
We recommend gettting this below 200KB. There are various tools online to help
with this.
${NO_COLOUR}
EOF
    exit 1
    fi
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
${RED}
ERROR: Could not find Python on your PATH. 
Python is required for this script to work, make sure it is installed first.
${NO_COLOUR}
EOF
fi
