import json

from factate.session import get_session


def write_output():
    output = {"pages": []}

    for page in [get_session().page]:
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

    output_fn = get_session().output_dir / "pages.json"
    with open(output_fn, "w") as f:
        json.dump(output, f, indent=2)
