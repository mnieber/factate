import json

from factate.session import get_session


def write_output():
    output = {"pages": []}

    for page in [get_session().page]:
        page_output = {"id": page.id, "snippets": []}
        output["pages"].append(page_output)

        for snippet in page.snippets:
            snippet_output = {
                "id": snippet.id,
                "title": snippet.title,
                "code_blocks": {},
                "facts": [],
            }
            page_output["snippets"].append(snippet_output)

            for code_block in snippet.code_blocks:
                code_block_output = {
                    "id": code_block.id,
                    "filename": code_block.filename,
                    "code": code_block.code,
                }
                snippet_output["code_blocks"][code_block.filename] = code_block_output

            for fact in snippet.facts:
                fact_output = {"id": fact.id, "title": fact.title, "text": fact.text}
                snippet_output["facts"].append(fact_output)

    output_fn = get_session().output_dir / "pages.json"
    with open(output_fn, "w") as f:
        json.dump(output, f, indent=2)
