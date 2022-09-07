import os

from factate.data.fact import Fact
from factate.parser.block import Block
from factate.parser.utils.create_title import create_title
from factate.session import get_session


class FactBlock(Block):
    def __init__(self, name, level):
        super().__init__(name, level)

    def finalize(self):
        super().finalize()

        text = ""
        for line in self.lines:
            text += line.text + os.linesep

        snippet = get_session().page.snippets[-1]
        snippet.facts.append(Fact(title=create_title(self.name), text=text))
