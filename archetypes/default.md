+++
title = '{{ .File.TranslationBaseName }}'
Description = "Your short description here"
date = '{{ time.Now.Format "2006-01-02" }}'
[params]
    featured = 0
    # Does not have to be your full name
    author = ""
    # REQUIRED:
    # Image should be given starting from /assets directory
    # Example: "/images/events/Topsham-Brewery.jpg"
    image = "/images/placeholder.png"

    # A citation is probably mandatory if we don't directly own it
    # Citations will appear as:
    # "name", from [source_name](link)
    [citation]
        name = ""
        source_name = ""
        link = ""
+++
