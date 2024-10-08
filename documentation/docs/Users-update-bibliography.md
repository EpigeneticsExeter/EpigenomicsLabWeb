# Users: How to update the bibliography

## Getting an up to date bibliography

To update the bibliography, you'll want to head over to
[Dimensions](https://app.dimensions.ai/discover/publication?search_mode=content&order=date&or_facet_researcher=ur.01337470631.76&or_facet_researcher=ur.0634726306.30&or_facet_researcher=ur.01040701516.28&or_facet_researcher=ur.0724251750.63&or_facet_researcher=ur.015375054345.08&or_facet_researcher=ur.01310756701.08&or_facet_research_org=grid.8391.3&or_facet_publication_type=article&or_facet_publication_type=preprint)
. From here, the filters should be good enough to work with. You can of course
change them to your heart's content. From here, you'll want to click on the
export button next to the search bar at the top of the page.

After clicking on the export button, get a full record in CSV format. We
previously used BibTex, but the publication dates are not full enough for 
our use case. I'd reccomend clicking on 'Send email when export is ready'
if you are not familiar with Dimensions as you'll probably struggle to find
your download link.

## Creating the bibliography

Next step is to download the csv file and put it somewhere in this directory.
It doesn't matter where it is, just make sure it isn't commited to the
repository at any point.

Before continuing, make sure that you have a python installation on your
`PATH` with the `pandas` and `dateparser` python libaries installed. You can
install all of these into a conda environment if you so wish (recommended).

The csv isn't in the correct format, we want it in json format. To accomplish
this, a script is provided in `scripts` called `update-bibliography-csv.sh`.
Use this script by simply running it with `.../update-bibliography-csv.sh`.

The script will run through things with you, answer the questions and it should
do the rest for you. Most of the time you can just copy and paste answers from
the output to the terminal. The path should be copied and pasted as it will
make things easier for you. The script asks the user what the name of each
column is as I can't reasonably automate this and it may be subject to change
in the future (especially if a different provider is used to get the list
of publicaitons).

## Quirk

The only problem you might have is that the first row of your downloaded file
might not be the header row. I don't know if this will always be the case, so I
do not remove the first row automatically in the script (though a suitable
warning pops up if the first row is predicted to not be a header row).
