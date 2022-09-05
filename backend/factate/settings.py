import os
from pathlib import Path

from factate.utils import yaml2dict
from factate.utils.merge_into_config import merge_into_config


def load_settings(settings_fn):
    settings = {}

    global_settings_fn = os.path.expanduser("~/.factate.config.yml")
    if os.path.exists(global_settings_fn):
        with open(global_settings_fn) as ifs:
            merge_into_config(settings, yaml2dict(ifs.read()))

    fn = Path(settings_fn)
    if not os.path.exists(fn):
        return settings

    with open(fn) as ifs:
        merge_into_config(settings, yaml2dict(ifs.read()))

    override_fn = Path(fn).with_suffix(".override.yml")
    if os.path.exists(override_fn):
        with open(override_fn) as ifs:
            merge_into_config(settings, yaml2dict(ifs.read()))

    return settings
