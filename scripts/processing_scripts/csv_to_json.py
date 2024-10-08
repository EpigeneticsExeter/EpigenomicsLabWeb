import argparse
import json
import csv


def list_of_strings(arg):
    return arg.split(',')


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("csv_file_path", type=str)
    parser.add_argument("json_file_path", type=str)
    parser.add_argument("id_field", type=str)
    parser.add_argument("--input_fields", type=list_of_strings)
    parser.add_argument("--output_fields", type=list_of_strings)

    args = parser.parse_args()
    return args


def read_csv(csv_file_path, id_field, fields):
    csv_file = csv.DictReader(open(csv_file_path))
    json_data = {}
    for row in csv_file:
        if row[id_field] not in json_data:
            json_data[row[id_field]] = {}
        for field in fields:
            json_data[row[id_field]][field] = row[field]
    return json_data


def rename_fields(data, input_fields, output_fields):
    for key in data:
        for i in range(len(input_fields)):
            if input_fields[i] in data[key]:
                data[key][output_fields[i]] = data[key][input_fields[i]]
                del data[key][input_fields[i]]
    return data


def write_json(json_data, json_file_path):
    with open(json_file_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)


def main():
    args = argument_parser()
    json_data = read_csv(args.csv_file_path, args.id_field, args.input_fields)
    json_data = rename_fields(json_data, args.input_fields, args.output_fields)
    write_json(json_data, args.json_file_path)


if __name__ == "__main__":
    main()
