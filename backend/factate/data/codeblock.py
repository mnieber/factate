from dataclasses import dataclass

from factate.data.entity import Entity


@dataclass
class CodeBlock(Entity):
    filename: str = ""
    code: str = ""
