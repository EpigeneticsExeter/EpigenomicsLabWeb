# Users: Adding new funders to the funders page

Currently no script exists to help you through this process, if you want to
add to the funders you will need to be comfortable with json files (it isn't
hard necessarily, there's just a few weird quirks that come with json). The
file that you will want to edit is found at `assets/data/funders.json`.

### Fields

There are only two fields for this json file, below are explanations for them:

- link: The full link to the funder's main page
- image: The name of the image for the funder. The image must be placed in the
  `assets/images/funders/` directory (as this saves you typing and helps with
  file organisation).

## Example

```json
"Alzheimers association" : {
  "link": "https://www.alz.org",
  "image": "alzheimers-association.jpg"
}
```
