from dataclasses import dataclass

from factate.data.entity import Entity


@dataclass
class Term(Entity):
    name: str = ""
    definition: str = ""
