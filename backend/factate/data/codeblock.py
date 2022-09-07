from dataclasses import dataclass


@dataclass
class CodeBlock:
    filename: str = ""
    code: str = ""
