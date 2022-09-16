from dataclasses import dataclass

from factate.data.section import Entity


@dataclass
class CodeBlock(Entity):
    filename: str = ""
    code: str = ""
