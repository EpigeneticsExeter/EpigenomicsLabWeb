# Users: How to add a new blog article

On a base level, all you need to do to create a new blog entry is use the
designated script found at:

`scripts/create-new-blog-entry.sh`.

This will load up a sort of wizard that will guide you through the creation
of the necessary file(s). Just answer the questions, if you type anything
incorrectly, the script will exit and the blog files will not be created. Make
sure you type your answers correctly (maybe copy and paste?).

## Adding metadata to your blog article

The wizard just handles creating the file and the metadata for you. The rest is
up to you. If you didn't let the wizard open up the file for you, you'll need
to open up the file displayed in the output of the script.

Once there you'll see the following at the top of the file:

```toml
+++
title = "blog name"
Description = "Put a description for your blog entry here"
date = 2000-01-01
[params]
    featured = 0
    # Put your name here
    author = ""
    # Put the path to your blog's image here
    # (starting the path from the /assets directory)
    # IMPORTANT: Please make sure your image is no larger than 200KB in size.
    image = "images/placeholder.png"
+++
```

Before you start writing your blog article, please change some of the entries
here. I don't want to see any "Put a description for your blog entry here" on
the official website. If you type a 1 in the `featured` area, your post will
be put at the top of the blog selection page.

You might be a little confused about the `image` field.
This field is for the image that is displayed on the blog selection page
(look at the events page for current examples). If you don't have an image to
use, leave this alone. If you *do* have an image to use however, move that 
image into the `assets` directory of the repository and provide the path to it.

For example, if you put your image in `assets/images/blog/my-image.png`, you
would put:

```toml
...
    image = "images/blog/my-image.png"
...
```

Note: Please make sure that we have the rights to such images.
Note2: Please don't add really big images (more than 200KB), they slow the
website down tremendously. I put a 4MB image onto a page in the past and was
wondering why the page was taking over 2 seconds to load every time.

## Adding content to your blog article

From here, everything should be very familiar to you. It's just a markdown 
file, add your words and story. That's all.

### Adding images to your blog article

You might want to add some additional images to your blog article, you can do
this rather easily. First, navigate to the folder in which the blog article
markdown file is. Add your image to this folder. Assuming that your image
is called "myImage.png", you would then add the following to your markdown
file:

```markdown
![alt-text](myImage.png)
```
