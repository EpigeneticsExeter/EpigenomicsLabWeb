# Scripts

This collection of scripts in theory will make additions to the website even
easier. For example, adding a new person only requires you to run a single 
script. This readme outlines how these scripts are to be used.

All of these scripts (except creating a new blog) require python (>= 3.8).

## change-personnel.sh 

Use this script to change the details about lab members. Use it to change
members information, add new members or remove people (though this last feature
is unlikely to be needed).

In general this should be a pretty simple script to run and use.

### Quirk

If you are adding a new person, you MUST put the person's profile picture into
/assets/images/profile_pictures before running the script. The profile must be
under the name: 

johndoe.(jpg/png/etc.)

That is, first name followed by last name (no spaces, all lowercase).

This is so that the profile pictures can be in a predictable format for other
functionality within the website (and that a picture does indeed exist whenever
a new person is added).

## change-opportunities.sh

use this script when you want to add/remove/change the entries on the
opportunities page. Answer the questions and the rest will be taken care of
for you.

## update-bibliography.sh

This script may change in the future. This script is here to convert a bibtex
file into a json format so that hugo can parse it when building the site.
If bibtex stops being the format of our publication bibliography, a new parser
will be required.

Currently this script requires the user running it to have the python library 
`bibtexparser`. 

## create-new-blog-entry.sh

This script will create a new blog article for the user. Currently it just
creates an index page in a new page collection, and fills out the toml of the 
index file for you. The user is still required to go into this file and change
some of the toml themselves (which I can almost guarantee isn't obvious 
enough).

The image for the blog can be added, I'm not enforcing this as it can be
difficult to get an image for all blogs.

The author needs to be added as well, I didn't want to add this as I want to 
reduce the number of required user inputs.

The user can also change the blog to be featured if they want. They just need
to be aware of the consequences. If two blogs are featured, only one will
be shown.
