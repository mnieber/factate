import os
import typing as T

from factate.data.codeblock import CodeBlock
from factate.data.entity import Entity
from factate.data.fact import Fact


class Example(Entity):
    def __init__(self, title: str, level: int):
        super().__init__()
        self.code_blocks: T.List[CodeBlock] = []
        self.facts: T.List[Fact] = []
        self.title = title
        self.text = level * "#" + " " + title + os.linesep
