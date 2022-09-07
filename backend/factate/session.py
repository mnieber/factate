import os
from pathlib import Path

from factate.data.glossary import Glossary
from factate.data.page import Page
from factate.settings import load_settings
from factate.utils.inflect import install_plural

_session = None


class Session:
    def __init__(self, index_file, settings_fn, output_dir):
        self.index_file = index_file
        self.settings_fn = settings_fn
        self.settings = None
        self.output_dir = Path(output_dir)
        self.glossary = Glossary()
        self.page = Page()

    def load_settings(self):
        settings_fn = Path(self.index_file) / self.settings_fn
        self.settings = load_settings(settings_fn)
        self.settings["index_file"] = self.index_file

        for one, many in self.settings.get("plurals", {}).items():
            install_plural(one, many)

    def report(self, x, end=os.linesep):
        print(x, end=end)


def set_session(session):
    global _session

    if _session:
        raise Exception("There already is a session")
    _session = session


def get_session():
    if not _session:
        raise Exception("There is no session")
    return _session
