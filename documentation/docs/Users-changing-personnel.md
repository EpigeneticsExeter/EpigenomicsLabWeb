# Users: How to change the alumni and current members pages

The data used for the alumni and current members pages is stored in a `.json`
file found in the `assets/data` directory. If you know what you are doing, you
can just enter this file and change the data here (as that will be much 
quicker). For information on what each field is go to 
[this section](#editing-the-json-file-directly).

For those who aren't as comfortable with json files, there is a script in the
`scripts` folder that can guide you through the process.

## IMPORTANT

Before running the script, if you are **adding** a person you will need to
place the profile picture of the person to the
`assets/images/profile_pictures/` directory. If you do not do this, the script
will throw an error.

The file name must be in the form:
`firstnamelastname.fileextension` or a different error will return. 

For example:

`samfletcher.jpg`
`eilishannon.png`

This might seem annoying, but I am not clever enough to figure out a robust way
of finding profile pictures unless they are in a specific format. I could add
a bunch of string manipulation to find the image, but this will needlessly add
complexity to the code and could still end up not working in certain edge 
cases.

## Using the designated script

In order to run this script, you will need python3 installed on your machine.

Run the script with:

```bash
cd scripts
./change-personnel.sh
```

After doing this, you will be taken through a series of questions. Answer them
and you will be taken to the main script that allows you to edit people. Do
not worry about case sensitivity, this is all handled for you.

If you are adding a person, it is worth mentioning that the only required
fields are the name and the profile picture. These are already filled out for
you by this point, so if you can't add any more information for whatever
reason, you can just skip the rest of the questions.

## Editing the json file directly

As mentioned, the json file you want is in the `assets/data` directory,
specifically under the file name `people.json`. Open this file in a text editor
and change/add/remove to your heart's content. If a field doesn't exist for
a person, fill it in with `null`, don't leave it out as the site will probably
break.

### Fields

Below is a quick definition of each field:

- name: The name that appears on the person's card
- image: The image that appears on the person's card (relative to the
    `assets/images/profile_pictures/` directory)
- alumni: Put `true` to put the person on the alumni page, `false` to put them
    on the current members page
- position: Options are currently (case sensitive):
    - PI
    - Postdoc
    - PhD
    - GRA
    - PTY
- theme: This doesn't actually do anything yet.
- github: The person's github handle (following the @)
- email: The person's work email
- linkedin: The person's linkedin profile 
    (the bit that follows `uk.linkedin.com/in/`).
- x: The person's x handle (following the @)
- orcid: The 16 digit number (0000-1234-0000-9876)
- biosketch: The person's UoE biosketch link
    (the bit that follows `https://experts.exeter.ac.uk/`)

### Example

Here's an example:

```json
"Eilis Hannon": {
    "name": "Eilis Hannon",
    "image": "eilishannon.jpg",
    "alumni": false,
    "position": "PI",
    "theme": "Analysis",
    "github": "ejh243",
    "email": null,
    "linkedin": null,
    "x": null,
    "orcid": null,
    "biosketch": "23540-eilis-hannon"
},
```
