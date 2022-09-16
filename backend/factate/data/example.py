import typing as T

from factate.data.codeblock import CodeBlock
from factate.data.fact import Fact
from factate.data.section import Section


class Example(Section):
    def __init__(self, title: str, level: int):
        super().__init__(title, level)
        self.code_blocks: T.List[CodeBlock] = []
        self.facts: T.List[Fact] = []
