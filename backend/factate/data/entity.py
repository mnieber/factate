import uuid
from dataclasses import dataclass, field


@dataclass
class Entity:
    id: str = field(default_factory=lambda: uuid.uuid4().hex)
