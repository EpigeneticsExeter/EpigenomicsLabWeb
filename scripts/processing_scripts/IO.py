import json
import pandas as pd


def read_json(file_path):
    try:
        with open(file_path, "r") as json_file:
            json_data = json.load(json_file)
            return json_data
    except (FileNotFoundError, json.JSONDecodeError):
        return


def write_json(file_path, json_data):
    try:
        with open(file_path, "w") as json_file:
            json.dump(json_data, json_file, indent=4)
    except (FileNotFoundError, json.JSONDecodeError):
        return


def read_csv(csv_file_path, na_value):
    csv_data = pd.read_csv(csv_file_path, header=0)
    for column in csv_data.columns:
        if csv_data[column].isnull().any():
            csv_data[column] = csv_data[column].astype(object)

            csv_data.fillna({column: na_value}, inplace=True)
    return csv_data
