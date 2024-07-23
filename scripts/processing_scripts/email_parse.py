import argparse
import re

parser = argparse.ArgumentParser()

parser.add_argument("email", type=str)

args = parser.parse_args()


def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9.]+@exeter\.ac\.uk$'
    if re.match(pattern, email):
        return True
    else:
        return False


def generate_exeter_email(email):
    if is_valid_email(email):
        return email
    else:
        username = email.split("@")[0]
        return f"{username}@exeter.ac.uk"


print(generate_exeter_email(args.email))
