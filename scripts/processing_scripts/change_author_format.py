import argparse
from IO import read_json, write_json


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("json_file_path", type=str)

    args = parser.parse_args()
    return args


def format_authors(author_field):
    authors = author_field.split(";")
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


def main():
    args = argument_parser()
    json_file = read_json(args.json_file_path)
    for _, item in json_file.items():
        item["author"] = format_authors(item["author"])
    write_json(args.json_file_path, json_file)


if __name__ == "__main__":
    main()
