import nltk

from factate.parser.block import Block
from factate.parser.glossary_block import GlossaryBlock
from factate.parser.line import get_create_line

try:
    nltk.sent_tokenize("test")
except LookupError:
    nltk.download("punkt")


class FormatError(Exception):
    pass


def clean_text(text):
    result = text
    return result


def clean_sentence(sentence):
    result = sentence
    return result


class BlockCollector:
    def __init__(self, create_block_policy, create_line_policy):
        self.stack = []
        self.block = None
        self.blocks = []
        self._create_block_policy = create_block_policy
        self._create_line_policy = create_line_policy

    @property
    def parent_block(self):
        return self.stack[-1] if self.stack else None

    def add_block_to_parent_block(self, text, level):
        self.block = self._create_block_policy(text, level, self.parent_block)
        self.stack.append(self.block)
        self.blocks.append(self.block)

    def add_line_to_current_block(self, text):
        line = self._create_line_policy(clean_sentence(text))
        self.block.add_line(line)

    def parse(self, text):
        for line in text.splitlines():
            if line.startswith("#"):
                level = len(line) - len(line.lstrip("#"))
                self.add_block_to_parent_block(line.lstrip("#").lstrip(), level)
            else:
                self.add_line_to_current_block(line)


def create_block(name, level, parent_block):
    block_type = GlossaryBlock if name.startswith("Glossary") else Block

    block = block_type(name, level)
    block.link(parent_block)
    return block


def get_blocks(markdown):
    blockCollector = BlockCollector(
        create_block_policy=create_block,
        create_line_policy=get_create_line(),
    )
    blockCollector.parse(markdown)
    return blockCollector.blocks
