import typing as T
from dataclasses import dataclass, field

from factate.data.codeblock import CodeBlock
from factate.data.fact import Fact


@dataclass
class Snippet:
    title: str = ""
    code_blocks: T.List[CodeBlock] = field(default_factory=list)
    facts: T.List[Fact] = field(default_factory=list)
