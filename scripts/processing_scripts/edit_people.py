import argparse
from IO import read_json, write_json


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("json_file", type=str)
    parser.add_argument("change_type", type=str)
    parser.add_argument("name", type=str)

    args = parser.parse_args()
    return args


def quit_with_message(_, __, ___):
    print("ERROR: Type of change must be one of: add, change or remove")
    quit()


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
        "position": (
            "Pick from: PI, Lecturer, PostDoc, "
                "PhD, Research-Fellow, Lab-Technician, "
                "Research-Assistant, GLA, GRA, PTY"
        ),
        "themes": "Pick from: Analysis, Lab, Bioinformatics",
        "github": "Your github username",
        "email": "Ex: j.a.doe@exeter.ac.uk",
        "linkedin": "The string after the last '/' in your profile's url",
        "x": "Your X username, don't include the @",
        "orcid": "16 digit number, Ex: 0009-0000-4090-9258",
        "website": "A full link to your personal website",
        "biosketch": "The string after the last '/' in your biosketch's url"
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


def add_person(json_file, name):
    person_information = {"name": name,
                          "alumni": False,
                          "position": None,
                          "themes": None,
                          "github": None,
                          "email": None,
                          "linkedin": None,
                          "x": None,
                          "orcid": None,
                          "website": None,
                          "biosketch": None}

    print(f"""
===============================================================================
Please answer the following questions for {name}.
Hit enter for N/A.
Use white space separation if {name} falls under multiple themes.
===============================================================================
""")

    for entry in list(person_information.keys())[1:]:
        person_information[entry] = get_people_information(name, entry)

    if person_information["alumni"] is None:
        person_information["alumni"] = False

    people_data = read_json(json_file)
    people_data[name] = person_information
    write_json(json_file, people_data)


def change_person(json_file, name):
    people_data = read_json(json_file)

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

    write_json(json_file, people_data)


def remove_person(json_file, name):
    people_data = read_json(json_file)

    try:
        del people_data[name]
    except (KeyError):
        print(f"ERROR: {name} is not in {json_file}. Please add them first.")
        return

    write_json(json_file, people_data)


def main():
    args = argument_parser()
    actions = {
        "add": add_person,
        "change": change_person,
        "remove": remove_person
    }

    action = actions.get(args.change_type, quit_with_message)

    action(args.json_file, args.name)


if __name__ == "__main__":
    main()
