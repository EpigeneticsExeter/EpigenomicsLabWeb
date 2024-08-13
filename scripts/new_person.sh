#!/bin/bash

SCRIPTS_DIR="$(realpath "$(dirname "$0")")"
PEOPLE_DIR="$SCRIPTS_DIR/../content/people"
ALUMNI_DIR="$SCRIPTS_DIR/../content/alumni"
ASSETS_DIR="$SCRIPTS_DIR/../assets"
IMAGES_DIR="$SCRIPTS_DIR/../assets/images/profile_pictures"
PYTHON_DIR="$SCRIPTS_DIR/processing_scripts/"

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

echo "Is this person Alumni? (y/n)"
read -r alumni

## ================= ##
##   EMAIL PARSING   ##
## ================= ##

if [[ -n "${email}" ]]; then
    formatted_email=$(python "${PYTHON_DIR}/email_parse.py" "${email}")
fi

## ================ ##
##   NAME PARSING   ##
## ================ ##

lower_case_name=$(echo "${name}" | tr '[:upper:]' '[:lower:]')
concatenated_name=$(echo "${lower_case_name}" | tr -d ' ')
capitalized_name=$(echo "${lower_case_name}" | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2));}1')

# We create a name glob (*firstname*lastname*) to more robustly find a person's
# profile picture
name_glob=$(python "${PYTHON_DIR}/name_parse.py" "${name}")

## =================== ##
##   PROFILE PICTURE   ##
## =================== ##

# For organisational purposes, images should be in the profile_pictures 
# directory
image_path="$(find "${IMAGES_DIR}" -type f -iname "${name_glob}")"
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

if [[ "${alumni}" == "y" ]]; then
    out_file="${ALUMNI_DIR}/${concatenated_name}.md"
else
    out_file="${PEOPLE_DIR}/${concatenated_name}.md"
fi

cat > "${out_file}" << EOF
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
