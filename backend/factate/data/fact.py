from dataclasses import dataclass

from factate.data.entity import Entity


@dataclass
class Fact(Entity):
    title: str = ""
    text: str = ""
