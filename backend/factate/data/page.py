import typing as T
from dataclasses import dataclass, field

from factate.data.entity import Entity
from factate.data.example import Example


@dataclass
class Page(Entity):
    examples: T.List[Example] = field(default_factory=list)
