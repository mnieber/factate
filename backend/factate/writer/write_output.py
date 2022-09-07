import json

from factate.session import get_session


def write_output():
    output = {"pages": []}

    for page in [get_session().page]:
        page_output = {"snippets": []}
        output["pages"].append(page_output)

        for snippet in page.snippets:
            snippet_output = {"title": snippet.title, "code_blocks": {}, "facts": []}
            page_output["snippets"].append(snippet_output)

            for code_block in snippet.code_blocks:
                code_block_output = {
                    "filename": code_block.filename,
                    "code": code_block.code,
                }
                snippet_output["code_blocks"][code_block.filename] = code_block_output

            for fact in snippet.facts:
                fact_output = {"title": fact.title, "text": fact.text}
                snippet_output["facts"].append(fact_output)

    output_fn = get_session().output_dir / "output.yml"
    with open(output_fn, "w") as f:
        json.dump(output, f, indent=2)
