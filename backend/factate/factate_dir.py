import os
import shutil

import yaml


def get_factate_parent_dir():
    cwd = os.getcwd()
    while cwd != "/":
        if os.path.exists(cwd + "/.factate"):
            return cwd
        cwd = os.path.dirname(cwd)
    return None


def create_factate_dir(factate_dir, index_file, bundle_dir):
    os.mkdir(factate_dir)
    shutil.copytree(bundle_dir, factate_dir + "/bundle")
    settings = dict(
        index_file=index_file,
        output_fn=os.path.join(factate_dir, "bundle/pages.json"),
    )
    settings_fn = os.path.join(factate_dir, "config.yml")
    with open(settings_fn, "w") as ofs:
        ofs.write(yaml.dump(settings, default_flow_style=False))
