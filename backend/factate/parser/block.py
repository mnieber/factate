import typing as T

from factate.parser.line import Line


class Block:
    def __init__(self, name, level):
        self.name = name
        self.level = level
        self.parent_block = None
        self.child_blocks = []
        self.lines: T.List[Line] = []

    @property
    def title_line(self):
        return self.lines[0] if self.lines else None

    def add_line(self, line: Line):
        self.lines.append(line)

    def link(self, parent_block):
        self.parent_block = parent_block
        if parent_block:
            parent_block.child_blocks.append(self)

    def get_blocks(
        self, include_self=True, include_children=False, include_parents=False
    ):
        result = []

        if include_parents and self.parent_block:
            result += self.parent_block.get_blocks(include_parents=True)

        if include_self:
            result += [self]

        if include_children:
            for child_block in self.child_blocks:
                result += child_block.get_blocks(include_children=True)

        return result

    def __repr__(self):
        return f"Block ({self.name})"
