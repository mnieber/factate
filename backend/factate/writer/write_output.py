import json
import os

from factate.parser.parser import parse_markdown
from factate.session import get_session


def write_output(pages):
    output = {"pages": []}

    for page in pages:
        page_output = {"id": page.id, "examples": []}
        output["pages"].append(page_output)

        for example in page.examples:
            example_output = {
                "id": example.id,
                "title": example.title,
                "codeBlocks": [],
                "facts": [],
            }
            page_output["examples"].append(example_output)

            for code_block in example.code_blocks:
                code_block_output = {
                    "id": code_block.id,
                    "filename": code_block.filename,
                    "code": code_block.code,
                }
                example_output["codeBlocks"].append(code_block_output)

            for fact in example.facts:
                fact_output = {"id": fact.id, "title": fact.title, "text": fact.text}
                example_output["facts"].append(fact_output)

    output_fn = get_session().settings["output_fn"]
    if os.path.exists(output_fn):
        os.remove(output_fn)
    with open(output_fn, "w") as f:
        json.dump(output, f, indent=2)


def create_pages():
    index_file = get_session().settings.get("index_file")
    with open(index_file) as ifs:
        markdown = ifs.read()
    output = parse_markdown(markdown)
    write_output(output)


def check_that_index_file_exists():
    index_file = get_session().settings.get("index_file")

    if not os.path.exists(index_file):
        msg = "Index file not found: %s. " % index_file
        raise Exception(msg + "Please check .factate/config.yml.")
