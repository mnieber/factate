import os
import shutil

from bottle import route, run, static_file
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

from factate.factate_dir import get_factate_parent_dir
from factate.session import get_session
from factate.writer.write_output import create_pages


class OnInputFileChanged(FileSystemEventHandler):
    def __init__(self, copy_to):
        self.copy_to = copy_to

    def on_modified(self, event):
        session = get_session()
        session.reset()

        print("Recompiling...")
        create_pages()

        if self.copy_to:
            print("Copying", session.settings["output_fn"], "to", self.copy_to)
            shutil.copyfile(session.settings["output_fn"], self.copy_to)


@route("/")
@route("/<path:path>")
def get_bundle(path=""):
    factate_parent_dir = get_factate_parent_dir()
    if not factate_parent_dir:
        raise Exception("Factate directory not found")

    bundle_dir = os.path.join(factate_parent_dir, ".factate/bundle")
    if path != "" and os.path.exists(bundle_dir + "/" + path):
        return static_file(path, root=bundle_dir)
    else:
        return static_file("index.html", root=bundle_dir)


def serve():
    run(host="0.0.0.0", port=8000, serve="gunicorn")


def create_observer(input_dir, copy_to):
    event_handler = OnInputFileChanged(copy_to)
    event_handler.on_modified(None)
    observer = Observer()
    observer.schedule(event_handler, path=input_dir, recursive=True)
    observer.start()
    return observer
