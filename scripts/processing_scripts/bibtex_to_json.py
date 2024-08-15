import argparse
import json
import bibtexparser


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("bibtex_file_path", type=str)
    parser.add_argument("json_file_path", type=str)

    args = parser.parse_args()
    return args


def convert_to_dictionary(bibliography):
    bibliography_as_dictionary = {
        item["unique-id"]: item for item in bibliography
    }
    return bibliography_as_dictionary


def remove_unneeded_entries(bibliography):
    keys_to_keep = ["title", "abstract", "author",
                    "doi", "earlyaccessdate", "journal"]
    subset_of_bibliography = {
        id: {key: value for key,
             value in details.items() if key in keys_to_keep}
        for id, details in bibliography.items()
    }

    return subset_of_bibliography


def remove_escape_characters(bibliography):
    for id, paper in bibliography.items():
        for key, value in paper.items():
            paper[key] = value.replace("\n", " ") \
                .replace("\\%", "%") \
                .replace("\\&", "&") \
                .replace("\\}", "}") \
                .replace("\\{", "{")
    return bibliography


def title_to_title_case(bibliography):
    for id, paper in bibliography.items():
        paper["title"] = paper["title"].title()

    return bibliography


def format_authors(author_field):
    authors = author_field.split(" and ")
    formatted_authors = []

    for author in authors:
        # If no "," exists in author, it is probably a organisation
        # or the person is mononymous (one name)
        if "," not in author:
            formatted_authors.append(author)
            continue
        author = author.replace(",", " ")
        author_name_parts = author.split()
        first_name = author_name_parts[1]
        last_name = author_name_parts[0]
        initials = ""

        # This assumes that any further entries to a name are only initials
        if len(author_name_parts) > 2:
            initials = " ".join(author_name_parts[2:])

        formatted_author = f"{first_name} {initials} {last_name}"

        # If a person has no initials, a double space will be present
        formatted_author = formatted_author.replace("  ", " ")
        formatted_authors.append(formatted_author)

    return ", ".join(formatted_authors)


def process_bibliography(bibliography):
    bibliography = convert_to_dictionary(bibliography)
    bibliography = remove_unneeded_entries(bibliography)
    bibliography = remove_escape_characters(bibliography)
    bibliography = title_to_title_case(bibliography)
    for id, paper in bibliography.items():
        paper["author"] = format_authors(paper["author"])

    return bibliography


def convert_bibtex(bibtex_file_path, json_file_path):
    with open(bibtex_file_path) as bibtex_file:
        bibliography = bibtexparser.load(bibtex_file)

    processed_bibliography = process_bibliography(bibliography.entries)
    json_data = json.dumps(processed_bibliography, indent=4)

    with open(json_file_path, "w") as json_file:
        json_file.write(json_data)


def main():
    args = argument_parser()
    convert_bibtex(args.bibtex_file_path, args.json_file_path)


if __name__ == "__main__":
    main()
