import os

from factate.data.section import Section
from factate.parser.block import Block


class StandardBlock(Block):
    def __init__(self, name, level):
        super().__init__(name, level)
        self.section = Section(name, level)

    def finalize(self):
        super().finalize()

        for line in self.lines:
            self.section.text += line.text + os.linesep
