import argparse
import json


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("json_file", type=str)
    parser.add_argument("change_type", type=str)
    parser.add_argument("name", type=str)
    parser.add_argument("profile_picture", type=str)

    args = parser.parse_args()
    return args


def quit_with_message(_, __, ___):
    print("ERROR: Type of change must be one of: add, change or remove")
    quit()


def load_data(file):
    try:
        with open(file, "r") as people_json:
            people_data = json.load(people_json)
            return people_data
    except (FileNotFoundError, json.JSONDecodeError):
        return


def write_data(file, data):
    try:
        with open(file, "w") as people_json:
            json.dump(data, people_json, indent=4)
    except (FileNotFoundError, json.JSONDecodeError):
        return


def get_alumni_information(name):
    information = input(f"""
Enter {name}'s alumni status (True or False):
""")
    if information.lower() == "true":
        return True
    return False


def get_people_information(name, field):
    example_texts = {
        "name": "Ex: Jane Doe",
        "image": "Ex: janedoe.png [make sure this exists in profile_pictures]",
        "position": "Pick from: PI, PostDoc, PhD, GRA, PTY",
        "themes": "Pick from: Analysis, Lab, Bioinformatics",
        "github": "Your github username",
        "email": "Ex: j.a.doe@exeter.ac.uk",
        "linkedin": "The string after the last '/' in your profile's url",
        "x": "Your X username, don't include the @",
        "orcid": "16 digit number, Ex: 0009-0000-4090-9258"
    }
    example_text = example_texts.get(field, "")
    if field == "alumni":
        information = get_alumni_information(name)
    else:
        information = input(f"""
Enter {name}'s {field} ({example_text}):
""")

    if information == "":
        return None
    return information


def add_person(json_file, name, profile_picture):
    person_information = {"name": name,
                          "image": profile_picture,
                          "alumni": False,
                          "position": None,
                          "themes": None,
                          "github": None,
                          "email": None,
                          "linkedin": None,
                          "x": None,
                          "orcid": None}

    print(f"""
===============================================================================
Please answer the following questions for {name}.
Hit enter for N/A.
Use white space separation if {name} falls under multiple themes.
===============================================================================
""")

    for entry in list(person_information.keys())[2:]:
        person_information[entry] = get_people_information(name, entry)

    if person_information["alumni"] is None:
        person_information["alumni"] = False

    people_data = load_data(json_file)
    people_data[name] = person_information
    write_data(json_file, people_data)


def change_person(json_file, name, profile_picture):
    people_data = load_data(json_file)

    if name not in people_data:
        print(f"ERROR: {name} is not in {json_file}. Please add them first.")
        return

    while True:
        person_keys = ", ".join(people_data[name].keys())
        print(f"What field would you like to change about {name}?")
        field_to_change = input(f"{person_keys} (or enter to quit): ")

        if field_to_change == "":
            break
        elif field_to_change not in person_keys:
            print(f"ERROR: {field_to_change} is not a valid field")
        else:
            print(f"""
{name}'s current value for {field_to_change} is:
{people_data[name][field_to_change]}
""")

            new_value = get_people_information(name, field_to_change)
            people_data[name][field_to_change] = new_value
            if field_to_change == "name":
                people_data[new_value] = people_data.pop(name)
                name = new_value

    write_data(json_file, people_data)


def remove_person(json_file, name, profile_picture):
    people_data = load_data(json_file)

    try:
        del people_data[name]
    except (KeyError):
        print(f"ERROR: {name} is not in {json_file}. Please add them first.")
        return

    write_data(json_file, people_data)


def main():
    args = argument_parser()
    actions = {
        "add": add_person,
        "change": change_person,
        "remove": remove_person
    }

    action = actions.get(args.change_type, quit_with_message)

    action(args.json_file, args.name, args.profile_picture)


main()
