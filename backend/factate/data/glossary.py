from factate.data.entity import Entity


class Glossary(Entity):
    def __init__(self, name):
        super().__init__()
        self._terms = {}
        self.name = name

    def add_term(self, term):
        self._terms[term.name] = term

    def get_term(self, name):
        return self._terms.get(name)

    def __iter__(self):
        return iter(self._terms.values())
