import typing as T

from factate.data.line import Line


class Block:
    def __init__(self, name, level):
        self.name = name
        self.level = level
        self.lines: T.List[Line] = []

    @property
    def title_line(self):
        return self.lines[0] if self.lines else None

    def add_line(self, line: Line):
        self.lines.append(line)

    def finalize(self):
        pass

    def __repr__(self):
        return f"Block ({self.name})"
