import os

from factate.data.example import Example
from factate.data.fact import Fact
from factate.parser.block import Block
from factate.parser.utils.create_title import create_title
from factate.session import get_session


class FactBlock(Block):
    def __init__(self, prefix, name, level):
        super().__init__(name, level)
        self.prefix = "" if prefix.lower() == "fact" else prefix

    def finalize(self):
        super().finalize()

        text = ""
        for line in self.lines:
            text += line.text + os.linesep

        example = get_session().page.sections[-1]
        assert isinstance(example, Example)

        example.facts.append(
            Fact(title=create_title(self.name, prefix=self.prefix), text=text)
        )
