# Users: How to change the available opportunities

This is very similar to how you might change a person. A json file is kept in
`assets/data` that stores the information on the current opportunities. You
can change this file directly if you are comfortable, otherwise a script 
exists in the `scripts` directory of this repository.

## Using the script

The script is fairly easy to use, run it with:

```bash
cd scripts
./change-opportunities.sh
```

Follow the instructions and you'll be done in approximately two jiffies.

## Directly changing the json file

Open up the `opportunities.json` file found in the `assets/data` directory in
your favourite text editor. Then edit the file however you need.

### Fields

The following is an explanation of the fields found in the json file:

- title: The name of the opportunity (big text)
- type: This dictates how the opportunities show up when the filter on the left
  of the page is used. Current working values are:
  - PTY
  - PhD
  - GRA
  - PostDoc
- description: The additional smaller text that appears below the title
- contact: Ideally just a name followed by an email contact. But realistically
you can just use this as a second paragraph for the description field.

## Example

```json
"GRA opportunity for epigenomic something something": {
    "title": "GRA opportunity for epigenomic something something",
    "type": "GRA",
    "description": "Fancy description here",
    "contact": "Eilis Hannon, E.J.Hannon@exeter.ac.uk"
}
```
