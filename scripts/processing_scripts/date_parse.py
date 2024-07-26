import dateparser
import datetime
import argparse

parser = argparse.ArgumentParser()

parser.add_argument("date", type=str)

args = parser.parse_args()

parsed_date = dateparser.parse(args.date)

formatted_date = parsed_date.strftime("%b %Y")
print(formatted_date)
