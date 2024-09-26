# Developers: Useful partials

There are some partials that can help you to achieve certain functionality on
the site without having to write everything yourself.

## Sass

The first of these is a partial to import some sass. To use it add the
following into your template:

```go
{{ define "extra_head" }}
{{ partial "partials/addSass.html" (dict "style" "sass/file-name.scss") }}
{{ end }}
```

You'll want to change `file-name.scss` to the name of your `scss` file found
in the `assets/sass` folder for this to work.

## Javascript

If you want to use javascript, then add this to your template:

```go
{{ define "scripts" }}
{{ partial "partials/addJS.html" (dict "jsfile" "js/file-name.js") }}
{{ end }}
```

You'll want to change `file-name.js` to the name of your `js` file found
in the `assets/js` folder for this to work.
