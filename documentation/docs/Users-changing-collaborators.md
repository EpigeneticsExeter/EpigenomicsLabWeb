# Users: How to add/change the collaborators page

There currently isn't a script to help you out with this process, so you are
unfortunately on your own for now (sorry). The file you need to change is a
`json` file found in `assets/data` called `collaborators.json`.

Apart from the fields (outlined below), there is one key peice of information
that I want to convey:

Don't make every collaborator 'featured'. This featured slideshow might get 
removed in the future if this proves to be a problem. But if every collaborator
is put as 'featured', the slideshow will become incredibly long and each
collaborator will be less featured than if they were all just listed one by one
below the slideshow.

## Fields

Below is the fields that are required by `collaborators.json`:

- name: The name of the collaborator (shown in large text)
- image: An image to display the collaborator. This currently needs to be
  a path relative to the `assets` directory.
- description: This is a description of the collaborator. It doesn't need to
  be very long of course. It doesn't even need to be about them, just explain
  how they have collaborated with us at a bare minimum.
- featured: Set this to `true` to put the collaborator into the slideshow that
  can be seen at the top of the collaborators page. Set this to `false` to
  add the collaborator to the list below the slideshow (where they will have
  a designated card instead).

## Example

Sorry for the poor example, but at this time there aren't any proper entries
to this page.

```json
"Collaborator 2": {
  "name": "Collaborator 2",
  "image": "images/placeholder.png",
  "description": "This collaborator has worked with us for y years and blah blah blah sciency talk blah blah blah",
  "featured": true
}
```

