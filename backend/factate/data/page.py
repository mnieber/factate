import typing as T
from dataclasses import dataclass, field

from factate.data.entity import Entity
from factate.data.snippet import Snippet


@dataclass
class Page(Entity):
    snippets: T.List[Snippet] = field(default_factory=list)
