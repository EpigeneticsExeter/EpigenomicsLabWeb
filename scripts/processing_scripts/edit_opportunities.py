import argparse
import json


def argument_parser():
    parser = argparse.ArgumentParser()

    parser.add_argument("json_file", type=str)
    parser.add_argument("change_type", type=str)

    args = parser.parse_args()
    return args


def quit_with_message(_, __, ___):
    print("ERROR: Type of change must be one of: add, change or remove")
    quit()


def load_data(file):
    try:
        with open(file, "r") as opportunity_json:
            opportunity_data = json.load(opportunity_json)
            return opportunity_data
    except (FileNotFoundError, json.JSONDecodeError):
        return


def write_data(file, data):
    try:
        with open(file, "w") as opportunity_json:
            json.dump(data, opportunity_json, indent=4)
    except (FileNotFoundError, json.JSONDecodeError):
        return


def list_opportunities(opportunities):
    output = "Current listings: \n"
    index = 1
    for entry in opportunities.keys():
        output += f"{index}: {entry} \n"
        index += 1
    print(output)


def get_title(opportunities):
    current_length = len(opportunities)
    index = int(input(f"Enter a number from 1 to {current_length}: "))

    # zero based indexing
    index -= 1
    try:
        for i, key in enumerate(opportunities.keys()):
            if i == index:
                return opportunities[key]["title"]
    except (ValueError):
        return


def get_opportunity_information(field):
    example_texts = {
        "title": "Ex: GRA opportunity for cell type deconvolution",
        "type": "Pick from: PI, PostDoc, PhD, GRA, PTY",
        "description": "This position...",
        "contact": "Please contact xyz at x.y.z@example.com"
    }
    example_text = example_texts.get(field, "")
    information = input(f"""
Enter the {field} ({example_text}):
""")

    if information == "":
        return None
    return information


def add_opportunity(json_file):
    opportunity_information = {"title": None,
                               "type": None,
                               "description": None,
                               "contact": None}

    print("""
===============================================================================
Please answer the following questions.
Hit enter for N/A.
===============================================================================
""")

    for entry in opportunity_information.keys():
        opportunity_information[entry] = get_opportunity_information(entry)

    opportunity_data = load_data(json_file)

    title = opportunity_information["title"]
    if title is None:
        print("ERROR: No title was given, this is required")
        return
    opportunity_data[title] = opportunity_information
    write_data(json_file, opportunity_data)


def change_opportunity(json_file):
    opportunity_data = load_data(json_file)

    print("Please select the opportunity that you would like to change:")
    list_opportunities(opportunity_data)

    title = get_title(opportunity_data)

    while True:
        opportunity_keys = ", ".join(opportunity_data[title].keys())
        print("What field would you like to change?")
        field_to_change = input(f"{opportunity_keys} (or enter to quit): ")

        if field_to_change == "":
            break
        elif field_to_change not in opportunity_keys:
            print(f"ERROR: {field_to_change} is not a valid field")
        else:
            print(f"""
The current value for {field_to_change} is:
{opportunity_data[title][field_to_change]}
""")

            new_value = get_opportunity_information(field_to_change)
            opportunity_data[title][field_to_change] = new_value
            if field_to_change == "title":
                opportunity_data[new_value] = opportunity_data.pop(title)
                title = new_value

    write_data(json_file, opportunity_data)


def remove_opportunity(json_file):
    opportunity_data = load_data(json_file)

    print("Please select the opportunity that you would like to change:")
    list_opportunities(opportunity_data)

    title = get_title(opportunity_data)

    del opportunity_data[title]

    write_data(json_file, opportunity_data)


def main():
    args = argument_parser()
    actions = {
        "add": add_opportunity,
        "change": change_opportunity,
        "remove": remove_opportunity
    }

    action = actions.get(args.change_type, quit_with_message)

    action(args.json_file)


if __name__ == "__main__":
    main()
