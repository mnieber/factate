from factate.data.line import get_create_line
from factate.parser.clean import clean_sentence
from factate.parser.example_block import ExampleBlock
from factate.parser.fact_block import FactBlock
from factate.parser.glossary_block import GlossaryBlock
from factate.session import get_session


class FormatError(Exception):
    pass


class Parser:
    def __init__(self, create_block_policy, create_line_policy):
        self.block = None
        self.blocks = []
        self._create_block_policy = create_block_policy
        self._create_line_policy = create_line_policy

    def add_block(self, text, level):
        if self.block:
            self.block.finalize()
        self.block = self._create_block_policy(text, level)
        if self.block:
            self.blocks.append(self.block)

    def add_line_to_current_block(self, text):
        line = self._create_line_policy(clean_sentence(text))
        if self.block:
            self.block.add_line(line)

    def parse(self, text):
        for line in text.splitlines():
            if line.startswith("#"):
                level = len(line) - len(line.lstrip("#"))
                self.add_block(line.lstrip("#").strip(), level)
            else:
                self.add_line_to_current_block(line)


def _remove_prefix(name, prefix):
    for p in (prefix + ":", prefix):
        if name.startswith(p):
            return name[len(p) :].strip()
    return None


def create_block(name, level):
    if name.startswith("Glossary"):
        return GlossaryBlock(name, level)

    if stripped_name := _remove_prefix(name, "Example"):
        return ExampleBlock(stripped_name, level)

    for prefix in ("Fact", "Note"):
        if stripped_name := _remove_prefix(name, prefix):
            return FactBlock(prefix, stripped_name, level)


def parse_markdown(markdown):
    parser = Parser(
        create_block_policy=create_block,
        create_line_policy=get_create_line(),
    )
    parser.parse(markdown)
    return [get_session().page]
