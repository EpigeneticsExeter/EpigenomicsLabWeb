# Users: How to change the repositories on the code page

There is currently no script that can assist you in changing the currently
shown code repositories. As a result, you'll need to change the file yourself.
This page knows which code repositories to show using a `json` file found at
`assets/data/repositories.json`.

## Fields

The fields required are as follows:

- username: The username (or organisation) the repository belongs to
- repo: The name of the repository

Notes:

- Both of these fields are case sensitive
- This currently only works for GitHub repositories

## Example

To include the [BrainFANS](https://github.com/ejh243/BrainFANS) repository for
example you would add:

```json
"brainfans": {
    "username": "ejh243",
    "repo": "BrainFANS"
}
```

