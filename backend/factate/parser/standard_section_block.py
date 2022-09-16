import os

from factate.data.standard_section import StandardSection
from factate.parser.block import Block
from factate.session import get_session


class StandardSectionBlock(Block):
    def __init__(self, name, level):
        super().__init__(name, level)
        self.section = StandardSection(name, level)

    def finalize(self):
        super().finalize()

        for line in self.lines:
            self.section.text += line.text + os.linesep

        get_session().page.sections.append(self.section)
