# Users: How to change the repositories on the code page

This is subject to change, but currently if you want to change the repositories
seen on the code page of the site you'll need to do the following:

## Step 1

Move over to the `content/code` directory in this repository.

## Step 2

You'll now want to delete, add or change one of the `.md` files found in this
directory. The names of the files don't actually matter currently, they are
purely for organisational purposes.

### Fields

Each file is actually just a bit of `.toml` and no markdown is actually
required. The fields required are as follows:

- username: The username (or organisation) the repository belongs to
- repo: The name of the repository

Notes:

- Both of these fields are case sensitive
- This currently only works for GitHub repositories

### Example

To include the [BrainFANS](https://github.com/ejh243/BrainFANS) repository for
example you would add:

```toml
+++
[params]
    username = "ejh243"
    repo = "BrainFANS"
+++
```

