import re

from factate.data.glossary import Glossary
from factate.data.term import Term
from factate.parser.block import Block
from factate.session import get_session


class GlossaryBlock(Block):
    def __init__(self, name, level):
        super().__init__(name=get_glossary_name(name), level=level)
        self.terms = list()
        self.pattern = re.compile(r"^-\s+(?P<name>[\w\ ]+): ")

    def add_line(self, line):
        super().add_line(line)

        match = self.pattern.match(line.text)
        if match:
            # get the name
            name = match.group("name")
            pos = len(match.group(0))
            definition = line.text[pos:]
            self.terms.append(Term(name=name, definition=definition))
        elif self.terms:
            self.terms[-1].definition += line.text

    def finalize(self):
        super().finalize()

        # add terms to the glossary
        glossary = Glossary(self.name)
        for term in self.terms:
            glossary.add_term(term)
        get_session().glossaries.append(glossary)


def get_glossary_name(name):
    pattern = re.compile(r"^Glossary \((?P<name>[\w\ ]+)\)")
    match = pattern.match(name)
    if match:
        return match.group("name")
    return ""
