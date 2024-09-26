# Developers: How the dark mode works

Everyone like dark mode right? Wrong, developers hate it. You now have to make
2 styles for every element (kinda). Luckily in our case, we have the blessing
of sass to help us through the pain.

## Problem

If you look at some of the compiled css that the site uses you will see parts
that look like this:

```css
.light-theme .content {
  color: #003333;
  background-color: white; }

.dark-theme .content {
  color: white;
  background-color: #333333; }
```

We *could* write these blocks out ourselves. This would get very annoying,
very quickly (especially when trying to get colours to align between pages). It
also would make the sass files harder to read. 

## Solution

Instead we use sass mixins, maps and functions to do all of the hard work
for us. Here is the magical code courtesy of Kaitlin McTigue (others have
done the same, but she wrote the blog that I read first on the topic):

```css
$themes: (
    light: (text: $dark_text_colour,
        bg: white,

    ),
    dark: (text: white,
        bg: #333333,
    ),
);

$theme-map: null;

@mixin themify($themes) {
    @each $name, $values in $themes {
        .#{$name}-theme {
            $theme-map: $values !global;
            @content;
        }
    }

    $theme-map: null !global;
}

@function themed($key) {
    @return map-get($theme-map, $key);
}
```

This looks rather complex, but it's not that bad. Basically we have a map of
themes (top) where each theme is a map itself holding certain values. The
`themify` mixin can be called in your sass file to define the `light-theme` and
`dark-theme` with the `light` or `dark` map defined inside each one. You can 
then use the `themed` function to grab the elements you want.

### Usage

Let's look at this magic sass in action:

```css
@import "partials/theme.scss"

@include themify($themes) {
    .content {
        color: themed('text');
        background-color: themed('bg');
    }
}
```

Here we import the theme sass file (so we can use the mixin and function) and
call the mixin. The `themify` will expand to:

```css
.light-theme {
    .content {
        color: themed('text');
        background-color: themed('bg');
    }
}
.dark-theme {
    .content {
        color: themed('text');
        background-color: themed('bg');
    }
}
```

Now we have styles for `.content` for both dark and light mode. We can then
extract the values for the `color` and `background-color` using our `themed`
function. The `themed` function will grab a value from the `$theme-map` map.
This map also gets defined for `dark-theme` and `light-theme` by `themify`.

As such this finally gets expanded into:

```css
.light-theme {
    .content {
      color: #003333;
      background-color: white;
    }
}
.dark-theme {
    .content {
      color: white;
      background-color: #333333;
    }
}
```

## The javascript implementation

There's a very simple script that is loaded into every page that keeps track
of whether dark mode is toggled on or off (`assets/js/dark-mode.js`). This
script takes advantage of the local storage of the browser to do this tracking.

If dark mode is toggled on, the `body` element of the page has the `dark-theme`
class added to it (otherwise it has the `light-theme`). Because all elements
on every page is a child of the body element, our css activates and the child
elements we have defined light/dark mode styles for will change.
