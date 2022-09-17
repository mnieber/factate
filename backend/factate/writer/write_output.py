import json
import os

from factate.data.example import Example
from factate.data.standard_section import StandardSection
from factate.parser.parser import parse_markdown
from factate.session import get_session


def write_output(pages):
    output = {"glossaries": [], "pages": []}

    glossaries_output = output["glossaries"]
    for glossary in get_session().glossaries:
        glossary_output = {"id": glossary.id, "name": glossary.name, "terms": []}
        glossaries_output.append(glossary_output)
        for term in glossary:
            glossary_output["terms"].append(
                {
                    "id": term.id,
                    "name": term.name,
                    "definition": term.definition,
                }
            )

    for page in pages:
        page_output = {"id": page.id, "sections": []}
        output["pages"].append(page_output)

        for section in page.sections:
            if isinstance(section, Example):
                example = section
                section_output = {
                    "type": "example",
                    "id": example.id,
                    "title": example.title,
                    "level": example.level,
                    "text": example.text,
                    "codeBlocks": [],
                    "facts": [],
                }
                page_output["sections"].append(section_output)

                for code_block in example.code_blocks:
                    code_section_output = {
                        "id": code_block.id,
                        "filename": code_block.filename,
                        "code": code_block.code,
                    }
                    section_output["codeBlocks"].append(code_section_output)

                for fact in example.facts:
                    fact_output = {
                        "id": fact.id,
                        "title": fact.title,
                        "text": fact.text,
                        "type": fact.type,
                    }
                    section_output["facts"].append(fact_output)
            elif isinstance(section, StandardSection):
                section_output = {
                    "type": "section",
                    "id": section.id,
                    "title": section.title,
                    "level": section.level,
                    "text": section.text,
                }
                page_output["sections"].append(section_output)

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
