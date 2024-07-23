#!/bin/bash

PEOPLE_DIR="$(dirname "$0")/../content/people"
ASSETS_DIR="$(dirname "$0")/../assets"
IMAGES_DIR="$(dirname "$0")/../assets/images/profile_pictures"
PYTHON_DIR="$(dirname "$0")/processing_scripts/"

cat << EOF
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
+ PEOPLE CREATOR                  +
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
+ Answer the following questions  +
+ and just hit enter ↳ for N/A    +
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

EOF

## ====================== ##
##   GATHER INFORMATION   ##
## ====================== ##

echo "Enter the person's name:"
read -r name
if [[ -z "${name}" ]]; then echo "name not given."; exit 1; fi

echo "Enter the person's position (GRA, PI, PhD, Postdoc):"
read -r position

echo "Enter the person's group/team (Analysis, Lab, Bioinformatics):"
echo "(Enter white space delimited list for multiple groups)"
read -r team

echo "Enter the person's email:"
read -r email

echo "Enter the person's X username:"
read -r x_username

echo "Enter the person's LinkedIn username:"
read -r linkedin

echo "Enter the person's GitHub username:"
read -r github

echo "Enter the person's ORCID username:"
read -r orcid

## ================= ##
##   EMAIL PARSING   ##
## ================= ##

formatted_email=$(python "${PYTHON_DIR}/parse_email.py" "${email}")

## ================ ##
##   NAME PARSING   ##
## ================ ##

lower_case_name=$(echo "${name}" | tr '[:upper:]' '[:lower:]')
concatenated_name=$(echo "${lower_case_name}" | tr -d ' ')
capitalized_name=$(echo "${lower_case_name}" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1')

## =================== ##
##   PROFILE PICTURE   ##
## =================== ##

# Images should be in the correct assets directory and under the correct file name
# for organisational purposes.
image_path="$(find "${IMAGES_DIR}" -type f -name "${concatenated_name}*")"
if [[ -z "${image_path}" ]]; then
    echo "Could not find an image for: ${name} in ${IMAGES_DIR}."
    echo "Please put an image in first under the name:"
    echo "$(realpath "${IMAGES_DIR}")/${concatenated_name}.png/jpg/etc."
fi

# hugo requires image paths to be relative to the /assets directory
relative_image_path=$(realpath -s --relative-to="${ASSETS_DIR}" "${image_path}")

## ============== ##
##   GENERATION   ##
## ============== ##

cat > "${PEOPLE_DIR}/${concatenated_name}.md" << EOF
+++
[params]
  name = "${capitalized_name}"
  image = "${relative_image_path}"
  position = "${position}"
  team = "${team}"
  [linktree]
    X = "${x_username}"
    orcid = "${orcid}"
    github = "${github}"
    linkedin = "${linkedin}"
    email = "${formatted_email}"
+++
EOF
