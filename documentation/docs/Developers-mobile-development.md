# Developers: Mobile development

The site might look nice on your big 16:9 monitor, but does it look nice on the
latest smart toothbrush? Making a site scalable to multiple devices is a bit of
a pain, but it is necessary.

If you want any help on how to make websites responsive to different devices,
I reccommend reading 
[this page from w3schools](https://www.w3schools.com/html/html_responsive.asp).

## How to check the site for mobile devices

If you are using a modern browser, you should have access to a developer view
of sites. This view will allow you to see the html, the computed styles of 
elements, the console and much more. Every browser has their own way of
opening up this view unfortunately, but you should be able to find the option
in the dropdown list when you right click on the background of a website.

Once you're in this view, you should see something like this on the right:

![developer view](./images/developer-view.jpg)

To see how the website looks under lots of different mobile devices, click on
the little mobile button:

![mobile button](./images/mobile-button.jpg)
![firefox mobile button](./images/mobile-button-firefox.jpg)

From here, you will open up the website from the perspective of a phone. You
can change the phone type using this dropdown menu:

![selection of device](./images/phone-dimensions.jpg)

You can also create your own dimensions on some browsers (it might be under a
'edit' button or 'responsive' button). Some browsers have further capabilities
of manipulating the device dimensions by dragging the sides (like resizing
a window). Use these views to see how the website looks on different devices.
If something doesn't look good, try to fix it.


### Quirks

I have tried lots of browsers to see which ones are good for mobile
development. The problem comes with conditional javascript and media queries in
the code base. If the site looks awful (some stuff not showing *etc.*), it
might not be your fault. Before getting mad at why it isn't working, try to
reload the page (not refresh the page, reload the page by navigating to it
again) or change to a different device (and change back). It's fustrating, but
I have found that doing a combination of these usually fixes problems that I
know shouldn't be there.
