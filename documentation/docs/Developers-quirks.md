# Developers: Weird quirks of the site/hugo

Whilst developing the site I have experienced some weird quirks that I have had
to struggle around. Here's a list:

## Site not reloading

Sometimes the site just does not update when you change something. Common
examples include:

- Changing the 404 page
- Changing the name of a layout (or adding a new layout)
- Changing the favicon

The reason this happens is that the public directory is not properly being
updated. To be more specific, when you make a change, the public directory is
not entirely recreated. As a result old files may still exist in there.

To properly make sure that the site is reloaded, you sometimes need to delete
the public directory so that hugo can recreate it.

You can do this by running the following:

```bash
# Stop the hugo server first
rm -r public
hugo server
```

You may also find it helpful to create an alias for this:

```bash
alias hugoreload="rm -r public && hugo server"
```

## Java script not loading

I was frequently having problems with java script not loading. There are two
things you should do to stop these problems in my experience.

First, make sure your java script is being imported at the bottom of the html.
You can do this by putting all of your scripts in the `scripts` block of the
baseof template.

Second, for some reason hugo (or web browsers, not sure which one), will not
load a javascript file if it has 2 or more "-" or "_" characters in the file
name. Fuck knows why.
