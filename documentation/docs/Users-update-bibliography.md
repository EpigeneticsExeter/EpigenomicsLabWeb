# Users: How to update the bibliography

This is all (hopefully) done for you by a script found in the `scripts`
directory provided in this repository.

To use this script, you'll need:

- python3
- The `bibtexparser` python library

Without these the script will fail.

## Use of the script

Firstly, you'll want to get a bibtex file that describes all of the
publications from the group. Next, put the `.bib` file anywhere in the
repository, the script currently finds it for you. Then just run the script
like so:

```bash
path/to/update-bibliography.sh
```

## In the event of problems

Hopefully your bibtex file is in the correct format and has the right fields.
If not, then you might need to edit the file or create an issue on github to
raise this as a problem.

The current script is very reliant on the input bibliography. If the file isn't
in the expected format, the script will fail.

