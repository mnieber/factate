from factate.utils.case import u0
from factate.utils.chop import chop_postfix


def create_title(x):
    return u0(chop_postfix(x, "."))
