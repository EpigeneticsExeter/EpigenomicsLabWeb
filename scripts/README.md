# Scripts

This collection of scripts in theory will make additions to the website even
easier. For example, adding a new person only requires you to run a script and
then fill in the fields in your terminal. This readme outlines a few quirks of
these scripts.

## new_person.sh

This fills in the fields required for a new person to be added to /people.

### Quirks

#### 1
An image of the person must already exist in `/assets/images/profile_pictures`
before running this script. In particular, this image must comply with the 
following:

If the person's name is `John Doe`, the image must be called `johndoe.png`.
(The file extension doesn't matter here, only the base name matters.)

#### 2
If you separate a person's teams/groups with anything other than a white space,
it is likely that undefined behaviour will result.

