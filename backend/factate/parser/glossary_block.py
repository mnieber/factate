import re

from factate.data.term import Term
from factate.parser.block import Block
from factate.session import get_session


class GlossaryBlock(Block):
    def __init__(self, name, level):
        super().__init__(name, level)
        self.glossary = get_session().glossary
        self.pattern = re.compile(r"^-\s+(?P<name>[\w\ ]+):")

    def add_line(self, line):
        super().add_line(line)

        match = self.pattern.match(line.text)
        if match:
            # get the name
            name = match.group("name")
            self.glossary.add_term(Term(name))
