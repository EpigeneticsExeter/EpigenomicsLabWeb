import argparse
import dateparser
from IO import read_json, write_json


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("json_file_path", type=str)

    args = parser.parse_args()
    return args


def change_date_format(json_data):
    for publication_id, publication in json_data.items():
        date = dateparser.parse(
            publication["date"],
            date_formats=['%Y-%m-%d', '%Y-%m', '%Y'],
            settings={'PREFER_DAY_OF_MONTH': 'first'}
        )
        new_date = date.strftime('%b %Y')
        publication["date"] = new_date
    return json_data


def main():
    args = argument_parser()
    json_file = read_json(args.json_file_path)
    json_file = change_date_format(json_file)
    write_json(args.json_file_path, json_file)


if __name__ == "__main__":
    main()
