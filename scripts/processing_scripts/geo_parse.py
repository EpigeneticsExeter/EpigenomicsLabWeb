import argparse
import re

parser = argparse.ArgumentParser()
parser.add_argument("geo_numbers", type=str)
args = parser.parse_args()


def extract_geo_accession_numbers(input):
    numbers = re.findall(r'\d+', input)
    return numbers


def format_geo_accession_numbers(geo_numbers):
    formatted_numbers = [f"GSE{number}" for number in geo_numbers]
    geo_accession_string = ",".join(formatted_numbers)
    return geo_accession_string


geo_numbers = extract_geo_accession_numbers(args.geo_numbers)

print(format_geo_accession_numbers(geo_numbers))
