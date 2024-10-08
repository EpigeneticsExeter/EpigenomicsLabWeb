import json
import argparse
import dateparser


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("json_file_path", type=str)

    args = parser.parse_args()
    return args


def read_json(file_path):
    with open(file_path, 'r') as json_file:
        json_file = json.load(json_file)
    return (json_file)


def write_json(file_path, json_data):
    with open(file_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)


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
