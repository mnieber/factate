import os
from pathlib import Path

from factate.data.glossary import Glossary
from factate.data.page import Page
from factate.settings import load_settings
from factate.utils.inflect import install_plural

_session = None


class Session:
    def __init__(self, settings_fn, output_dir):
        self.settings_fn = settings_fn
        self.settings = None
        self.output_fn = Path(output_dir) / "pages.json"
        self.glossary = Glossary()
        self.page = Page()

    def load_settings(self):
        self.settings = load_settings(self.settings_fn)

        for one, many in self.settings.get("plurals", {}).items():
            install_plural(one, many)

    def report(self, x, end=os.linesep):
        print(x, end=end)


def set_session(session):
    global _session

    _session = session


def get_session():
    if not _session:
        raise Exception("There is no session")
    return _session
