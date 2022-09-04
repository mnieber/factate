from argparse import ArgumentParser

from dodo_commands import Dodo


def _args():  # noqa
    parser = ArgumentParser(description=("Initialize the Factation project."))
    args = Dodo.parse_args(parser)
    return args


if Dodo.is_main(__name__):
    args = _args()
    Dodo.run(["dodo", "backend.make", "init-dev"])
    Dodo.run(["dodo", "frontend.make", "init-dev"])
