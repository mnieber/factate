import re

from factate.parser.block import Block
from factate.parser.term import Term
from factate.session import get_session


class GlossaryBlock(Block):
    def __init__(self, name, level):
        super().__init__(name, level)
        self.glossary = get_session().glossary
        self.pattern = re.compile(r"^-\s+(?P<name>[\w\ ]+):")

    def add_line(self, line):
        super().add_line(line)

        # create regex pattern of a hyphen followed by a name (that is captured) and a colon
        # for every match
        for match in self.pattern.finditer(line.text):
            # get the name
            name = match.group("name")
            self.glossary.add_term(Term(name))
