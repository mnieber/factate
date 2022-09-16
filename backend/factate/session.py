import os

from factate.data.page import Page
from factate.factate_dir import get_factate_parent_dir
from factate.settings import load_settings
from factate.utils.inflect import install_plural

_session = None


class Session:
    def __init__(self, settings_fn):
        self.settings_fn = settings_fn
        self.settings = {}
        self.reset()

    def reset(self):
        self.glossaries = []
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


def create_session():
    factate_parent_dir = get_factate_parent_dir()
    if not factate_parent_dir:
        raise Exception("No factate directory found")

    session = Session(os.path.join(factate_parent_dir, ".factate/config.yml"))
    session.load_settings()
    set_session(session)
    return session
