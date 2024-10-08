import argparse
import pandas as pd
from IO import read_csv, write_json


def list_of_strings(arg):
    args = arg.split(',')
    args = [arg.lower() for arg in args]
    return args


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("csv_file_path", type=str)
    parser.add_argument("json_file_path", type=str)
    parser.add_argument("id_column", type=str)
    parser.add_argument("--input_columns", type=list_of_strings)
    parser.add_argument("--output_columns", type=list_of_strings)

    args = parser.parse_args()
    return args


def remove_unwanted_columns(csv_data, columns_to_keep):
    all_columns = set(csv_data.columns)
    columns_to_keep = set(columns_to_keep)
    columns_to_remove = all_columns - columns_to_keep
    columns_to_remove = list(columns_to_remove)
    csv_data.drop(columns=columns_to_remove, inplace=True)
    return csv_data


def rename_columns(csv_data, input_columns, output_columns):
    for i, _ in enumerate(input_columns):
        csv_data.rename(
            columns={input_columns[i]: output_columns[i]}, inplace=True)
    return csv_data


def convert_dataframe_to_dictionary(csv_data, id_column, columns):
    data = {row[id_column]: row.to_dict() for _, row in csv_data.iterrows()}
    return data


def main():
    args = argument_parser()
    csv_data = read_csv(args.csv_file_path, 'null')
    csv_data.columns = csv_data.columns.str.lower()
    csv_data = remove_unwanted_columns(
        csv_data,
        args.input_columns + [args.id_column.lower()]
    )
    csv_data = rename_columns(
        csv_data,
        args.input_columns,
        args.output_columns
    )
    json_data = convert_dataframe_to_dictionary(
        csv_data,
        args.id_column.lower(),
        args.input_columns
    )
    write_json(args.json_file_path, json_data)


if __name__ == "__main__":
    main()
