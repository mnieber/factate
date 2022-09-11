from factate.utils.case import u0
from factate.utils.chop import chop_postfix


def create_title(x, prefix=None):
    prefix = prefix + ": " if prefix else ""
    return u0(chop_postfix(prefix + x, "."))
