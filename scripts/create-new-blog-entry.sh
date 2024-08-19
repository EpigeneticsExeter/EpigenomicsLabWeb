#!/bin/bash

SCRIPTS_DIR="$(realpath "$(dirname "$0")")"
CONTENT_DIR="$SCRIPTS_DIR/../content"
CONTENT_DIR=$(realpath "$CONTENT_DIR")
EVENTS_DIR="$CONTENT_DIR/events"
PROJECTS_DIR="$CONTENT_DIR/projects"

convert_to_lower() {
    echo "$(echo "$1" | tr '[:upper:]' '[:lower:]')"
}

while [[ "${blog_type}" != "event" ]] && [[ "${blog_type}" != "project" ]]; do
    echo "What type of blog would you like to create? (Event, Project)"
    read -r blog_type
    blog_type=$(convert_to_lower "${blog_type}")
done


if [[ "${blog_type}" == "project" ]]; then
while [[ "${blog_type}" != "phd" ]] && [[ "${blog_type}" != "pty" ]] && [[ "${blog_type}" != "general" ]] ; do
    echo "What type of project blog would you like to create? (PhD, PTY, General)"
    read -r blog_type
    blog_type=$(convert_to_lower "${blog_type}")
done
fi


blog_name_taken="true"
while [[ $blog_name_taken == "true" ]]; do
    echo "What is the name of the blog entry? (Please use <10 words)"
    read -r blog_name

    # directory name shouldn't have spaces in it, hopefully people don't use
    # special characters (I will come back to this if it is a problem)
    dir_name=$(echo "${blog_name}" | tr ' ' '-')

    if [[ -n $(find "${CONTENT_DIR}" -type d -name "${dir_name}") ]]; then
        echo "This blog already exists, please pick a different name"
    else
        blog_name_taken="false"
    fi
done 


case "${blog_type}" in
    event ) blog_path="$EVENTS_DIR/${dir_name}"  ;;
    phd ) blog_path="$PROJECTS_DIR/phdprojects/${dir_name}" ;;
    pty ) blog_path="$PROJECTS_DIR/ptyprojects/${dir_name}" ;;
    general ) blog_path="$PROJECTS_DIR/ourprojects/${dir_name}" ;;
    * ) exit 1 ;;
esac

mkdir -p "${blog_path}"

the_date=$(date +%y-%m-%d)

cat >> "${blog_path}/index.md" << EOF
+++
title = "${blog_name}"
Description = "Put a description for your blog entry here"
date = ${the_date}
[params]
    featured = 0
    # Put your name here
    author = ""
    # Put the path to your blog's image here 
    # (starting the path from the /assets directory)
    image = "images/placeholder.png"
+++
EOF

cat << EOF
The blog page has been created in the following location:

${blog_path}/index.md

Would you like to open this file in your default EDITOR ($EDITOR)?
(y/n)
EOF

read -r open_blog

if [[ "${open_blog}" == "y" ]] && [[ -n "${EDITOR}" ]]; then
    $EDITOR "${blog_path}/index.md"
fi

