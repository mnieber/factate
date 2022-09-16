import typing as T
from dataclasses import dataclass, field

from factate.data.section import Entity
from factate.data.standard_section import Section


@dataclass
class Page(Entity):
    sections: T.List[Section] = field(default_factory=list)
