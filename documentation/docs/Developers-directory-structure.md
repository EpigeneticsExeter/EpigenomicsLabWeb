# Developers: Directory structure of the website

If you are new to static site generators (SSG), you may initially be quite
lost. This page aims to guide you around the directory structure that hugo has.
If you don't like the names of these directories... tough. You can't change
them unless we use an entirely different SSG, which would be a whole lotta
work.

This is not documentation for hugo. If you want to learn more about the
specifics of hugo, go to the [official documentation](https://gohugo.io).

## Overview

Below is the file tree that this repository currently has:

```
EpigenomicsLabWeb/
├── archetypes
├── assets/
│   ├── data
│   ├── gifs
│   ├── images
│   ├── js
│   ├── sass
│   └── svgs
├── content
├── documentation
├── layouts
│   └── partials
├── public
├── scripts
└── static
```

## Archetypes

This isn't really used for this website as it isn't powerful enough in my
opinion. The idea with this directory is that it contains files that help the
user to create blog entries easier. 

Hugo encourages developers to create new blog entries using:

```bash
hugo new content new-blog-entry
```

Upon running this command, hugo will create a new markdown file in the content
directory where the `toml` at the top is already filled in. This initally
sounds useful, until you realise it means that users that want to just add a
markdown file need hugo and need to understand the directory structure first.
That's not the most user friendly unfortunately. As such a script is given for
this process instead (the documentation for which can be found on 
[this page](./Users-new-blog.md))

## Assets

The assets directory is where external content like images and css is stored
for the website. We put these files here as hugo can very easily grab these
files for us when we request for them. To file a request for an asset we can
use:

```hugo
{{ resources.Get 'data/funders.json' }}
```

This returns the resource for us to use in any html files. Without this
functionality, we would need to know in advance where the file is going to be
when the website is built (which is a massive pain and sometimes impossible).

### data

The data directory contains lots of `json` files currently. These hold the
information necessary for pages like:

- Current members
- Publications
- Alumni 
- *etc.*

### gifs, images, svgs

These directories are split up right now for no reason in particular. They
each hold image files that can be displayed on the website.

#### IMPORTANT

Please make sure that the files in these directories are relatively small
(<=200KB). If they get too big, the site will slow down considerably. As
brilliant as the web is, it is surprisingly slow.

### js

This directory holds the java script files that the site uses.

### sass

This directory contains all of the sass (`.scss` files) that are used to style
the web pages. Hugo allows sass transpiling out of the box with the extended
version via the use of `Dart sass`. The decision for using sass was an easy
one. Sass allows for partial files, mixins, global variables and more (css
pales in comparison). Other supersets of css exist of course, but the fact that
hugo supports sass directly makes it the obvious choice.

To add sass into your template, I emplore you to check out
[this section](#important-partials).

## Content

The markdown files found in this directory directly correspond with pages on
the site. If the page exists on the site, there will be a `.md` file in this
directory that it is generated from.

For example, the home page is given by the file `content/_index.md`.

You'll notice that this isn't called `home.md` or something similar. The reason
for this is that if a file is called `index.html` or `_index.html` (hugo
converts this markdown file into a html file), the slug for that page is blank.

This means the home page is just `domain.com` instead of `domain.com/home`.

### toml

At the top of all markdown files is a little bit of `toml`. The toml is given
inside of three "+" characters:

```toml
+++
field1 = blahblahblah
[category]
  field2 = blahblahblah
+++
```

These are the crux of the site in my opinion. For the majority of pages, you'll
see that there is no markdown at all. The only contents of the file will be
some toml that looks like:


```toml
+++
Title = "Home Page"
layout = "home"
+++
```

The `Title` field doesn't really do anything important. The `layout` field
does however. This field tells hugo what [layout](#layouts) to use to render
the page. Without this, every page would just be blank. If you want to try and
understand it properly, the layout lookup order hugo uses can be found 
[here](https://gohugo.io/templates/lookup-order/).

If you just want to know how this site works read below:

#### Layout lookup order

1) If the page is found in the root of `content`, hugo will look inside
  `layouts/page` if you provide a layout in the `toml`.

2) If the page is found in a sub directory of `content` and is called 
  `_index.md`, hugo will look inside `layouts/section` if you provide a layout
  in the `toml`.

3) If the page is found in a sub directory of `content` and is not called
  `_index.md`, hugo will use `layouts/dir/single.html` where `dir` is the name
  of the subdirectory. This is only if you don't provide a layout. Fuck knows
  what hugo does when you provide a layout.

## Documentation

This is where the documentation for how the site works. The pages you are 
viewing right now in fact. Not much more to say.

## Layouts

The layouts are the meat of the sandwich. They tell hugo how to render each
page. These are html files that are organised in a specific way to make the
layout lookup order make sense to me. For more information on layout lookup
order, look at [this section](#layout-lookup-order).

Layouts are html focussed, but they can also contain snippets of go if you
surround some code in `{{ }}`. For example:

```go
{{ add 1 2 }}
```

Would render to be `3` on the website. This is used extensively across the
site.

### baseof and  blocks

All pages on the site have a header (navigation bar and logo) and a footer.
To save time and sanity, we don't copy and paste these at top and bottom of
every layout (that would be ridiculous). Instead all layouts are actually just
one part of a bigger layout called `baseof` which can be found in 
`layouts/_default`.

All pages should render using this baseof template. The way individual layouts
are inserted into this larger template is through the use of blocks. If you
look at the baseof template, you will see lines like:

```go
{{ block "main" . }}
{{ end }}
```

This is a block and it allows another layout to insert its contents into
the baseof template. The baseof template has multiple blocks, so we need to
tell hugo where to put the contents of our individual templates. To do this we
need to use the `define` keyword. For example, to add `<p> some text </p>` into
the baseof template, you would need to have the following in your template:

```go
{{ define "main" }}
<p> some text </p>
{{ end }}
```

You will notice that some blocks already have contents. This can be seen as
the default. If the layout in question does not define this block, the baseof
template will render this instead. So for example:

```go
{{ block "newblock" . }}
<p> hello </p>
{{ end }}
```

will force the text "hello" to appear on all pages where the layout used does
not have the line `{{ define "newblock" }}`.

#### Currently used blocks

There are 4 main blocks right now in the baseof template:

- Title: This can be used to change the tab text for the webpage 
  (top of web browser). This is usually just left to the default.
- extra head: This is used to ensure that some html is rendered before any 
  content. It is very useful for putting in style sheets (which need to be
  loaded before the content they style)
- main: This is where most of your layout will go
- scripts: This is where I advise you put your js file loading. It is usually
  best to have java script files load last so they don't fail (if an element
  hasn't loaded yet, a script won't be able to find it and fail)

### Partials

To further assist in reducing repetition, go provides developers with partials.
These are html files that you can directly import into any layout so that you
don't have to type the whole thing out again. The footer, for example is one
such partial.

Partials can be imported using:

```go
{{ partial "partials/name-of-partial.html" }}
```

#### Important partials

There are some partials that can help you to achieve certain functionality on
the site without having to write everything yourself.

The first of these is a partial to import some sass. To use it add the
following into your script:

```
{{ define "extra_head" }}
{{ partial "partials/addSass.html" (dict "style" "sass/file-name.scss") }}
{{ end }}
```

You'll want to change `file-name.scss` to the name of your `scss` file found
in the `assets/sass` folder for this to work.

##### Javascript

If you want to use javascript, then add this to your template:

```go
{{ define "scripts" }}
{{ partial "partials/addJS.html" (dict "jsfile" "js/file-name.js") }}
{{ end }}
```

You'll want to change `file-name.js` to the name of your `js` file found
in the `assets/js` folder for this to work.

## Public

Don't touch anything in this directory (though looking around might
contextualise some things for you). This is the directory that actually holds
the files that the hosted site uses. Here you'll find all of the html files
(that hugo has generated from your markdown files), css files, java script
files and images used on the site. These files are the same ones you will see
when you open up the developer console in your browser.

## Scripts

The scripts folder is home to all the helper scripts for users to use when
adding/changing the content on the website.

## Static

We don't really use the static directory much for this site. Usually you would
put some images here, but we are working with the assets directory for that.
The one thing the static directory is used for however is setting the favicon.
The favicon is the little image you see to the left of the tab name in your
browser. I haven't found any way to get the favicon to load in without using
the static directory so far.
