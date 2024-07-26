import argparse
import re

parser = argparse.ArgumentParser()
parser.add_argument("name", type=str)
args = parser.parse_args()


def extract_name_parts(input):
    name_parts = re.findall(r'\w+', input)
    return name_parts


def generate_name_glob(name_parts):
    name_glob = "*" + "*".join(name_parts) + "*"
    return name_glob


name_parts = extract_name_parts(args.name)

print(generate_name_glob(name_parts))
