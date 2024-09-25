# How to use this documentation

## Installing mkdocs

You'll need mkdocs and material which can be installed via `pip`.

You can do this with the following command:

```bash
pip install mkdocs-material
```

Ideally you would do this in a virtual (or conda) environment, but this isn't
100% necessary if you don't know how.


## Running docs

To run the docs locally, you need to go into the `Documentation` directory
(The directory this README file is in) and run:

```bash
mkdocs serve
```

This will run the server and give you a link to go to:

```text
INFO    -  Building documentation...
INFO    -  Cleaning site directory
INFO    -  Documentation built in 1.50 seconds
INFO    -  [15:04:47] Watching paths for changes: 'docs', 'mkdocs.yml'
INFO    -  [15:04:47] Serving on http://127.0.0.1:8000/
```

In the example above, entering `http://127.0.0.1:8000` into any web browser
will open up the documentation for you.

## Adding to docs

If you need to add to the docs at all, create a new branch and head into the
`docs` directory inside the `Documentation` directory. Here are markdown files
that directly correspond with the pages on the site. Edit these or add new ones.
