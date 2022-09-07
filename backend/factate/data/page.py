import typing as T
from dataclasses import dataclass, field

from factate.data.snippet import Snippet


@dataclass
class Page:
    snippets: T.List[Snippet] = field(default_factory=list)
