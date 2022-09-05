class Glossary:
    def __init__(self):
        self._terms = {}

    def add_term(self, term):
        self._terms[term.name] = term

    def get_term(self, name):
        return self._terms.get(name)

    def __iter__(self):
        return iter(self._terms.values())
