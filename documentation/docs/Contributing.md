# Contributing [PLEASE READ]

Regardless of what you plan to do with the website (adding content, adding
features, redesigning pages *etc.*), follow this basic philosophy.

## Issues

For any contribution, it is nice if others know you are working on something.
Assign yourself to an issue on GitHub before working on the site. If a 
relevant issue doesn't already exist, just create it using the templates. If
you don't do this, you run the risk of two people working on the same thing
at the same time (which is a waste and can be rather fustrating).

## Pull

Get the latest version of the repository. Pull the latest changes into the
`main` branch. If you don't you could end up creating lots of unnecessary
merge conflicts which can be annoying to work through.

## Branch

Create a new branch off of main. There are branch protection rules that 
*should* prohibit you from pushing your changes directly to main. The reason
for this is to minimise the chances of the site breaking. If you were to push
a change that breaks the site to main, we would need to fix this before any
new changes can be made (working on a branch isolates your changes).

## Check it works

Run the website on local host by using `hugo` with:

```bash
cd path/to/repo/root
hugo server
```

If you don't have `hugo` installed, that's ok (though I would definitely
recommend installing it if you are doing anything beyond adding content). 
Someone else will just have to check for you.

## Pull request

Once you've made your changes, make a pull request on GitHub. There's a 
checklist on the template for you to fill in. The only bit that really matters
is the final one:

```text
## Checklist:
- [ ] I have checked that the site runs with no errors locally
```

Don't lie here please. It's ok if you haven't checked for errors, the point of
this checkbox is mainly to just remind you to check. If the site does have
errors, these should be fixed before the pull request is approved.


## Further information

If something on this page doesn't make sense, ask a question on the 
[discussions page](https://github.com/EpigeneticsExeter/EpigenomicsLabWeb/discussions/categories/q-a).

If your git knowledge is lacking, you may find 
[these pages useful](https://ejh243.github.io/BrainFANS/category/contributing-to-brainfans---a-quick-start-guide)

