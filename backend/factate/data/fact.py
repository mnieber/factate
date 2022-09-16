from dataclasses import dataclass

from factate.data.section import Entity


@dataclass
class Fact(Entity):
    title: str = ""
    text: str = ""
    type: str = ""
