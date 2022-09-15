import os

from factate.data.entity import Entity


class Section(Entity):
    def __init__(self, title: str, level: int):
        super().__init__()
        self.title = title
        self.text = level * "#" + " " + title + os.linesep
