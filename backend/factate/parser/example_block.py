import os
import re

from factate.data.codeblock import CodeBlock
from factate.data.example import Example
from factate.parser.block import Block
from factate.parser.utils.create_title import create_title
from factate.session import get_session


class ExampleBlock(Block):
    def __init__(self, name, level):
        super().__init__(name, level)
        self.example = Example(title=create_title(name))
        self.pattern = re.compile(r"^//\s+file: (?P<filename>[\w\ \.]+)")

    def finalize(self):
        super().finalize()

        code_block = None
        for line in self.lines:
            if line.text.startswith("```"):
                if code_block is None:
                    code_block = CodeBlock()
                    code_block.code += line.text + os.linesep
                else:
                    code_block.code += line.text + os.linesep
                    self.example.code_blocks.append(code_block)
                    code_block = None
            elif code_block:
                match = self.pattern.match(line.text)
                if match:
                    code_block.filename = match.group("filename")
                else:
                    code_block.code += line.text + os.linesep

        get_session().page.examples.append(self.example)
