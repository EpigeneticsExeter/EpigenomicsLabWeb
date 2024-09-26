# Developers: Javascript

Because I am very new to java script and my code is likely horrible. I thought
it would be a good idea to give an overview of how each major script attempts
to achieve its purpose.

## Filtering

Filtering scripts are rather simple. I have a function set up that will
set the display of the filtered elements to "none" or "flex" depending on what
the function's argument is. I decide which elements to show based on the class
list, the child elements or the data labels of the element.

Each button on the web page will have an event listener so that when they
are clicked, they will run the filtering function.

## Searching

Searching is rather simple. I am grabbing the search term from the input box
then I set the display of elements to "flex" or "none" depending on whether
or not the element's class list, id, child element (*etc.*) includes that
search string.

## Sorting

The sorting uses the `sort` method. You can pass a function into the sort 
method to determine your own order. The function is of the following form:

```js
mysort(a,b) {
    if (condition1) {
        // order a before b
        return -1 // or just less than 0
    }
    if (condition2) {
        // order a after b
        return 1 // or just more than 0
    }
    else {
        // keep original order
        return 0
    }
}
```

After sorting all of the elements in a particular array. These elements are
added sequentially to some parent element in the order that the sort has
determined.

## The nav bar

The nav bar is a little finicky, I've had a lot of troubles with it. The
current design is inspired by [this site's navbar](https://mousesports.com).

The javascript here is to ensure nothing weird happens with all of the
overlapping elements (sub navigation bars intersect one another). Basically
the code is making sure that the sub navigation bar will show up when the mouse
enters the corresponding main navigation item. The sub navigation bar then
needs to stay on the screen until either the mouse completely leaves the
navigation area or the mouse goes to one of the other main navigation bar
items.

Yes, there might be a better way of doing this, but this solution works for
now, so I don't care.
