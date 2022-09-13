import os
import shutil
import sys
import traceback
from argparse import ArgumentParser

from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

import trigger_update  # noqa
from factate.parser.parser import parse_markdown
from factate.session import Session, set_session
from factate.writer.write_output import write_output
from serve import serve


class OnInputFileChanged(FileSystemEventHandler):
    def __init__(self, index_file, output_dir):
        self.index_file = index_file
        self.output_dir = output_dir

    def on_modified(self, event):
        session = create_session(self.output_dir)
        cwd = os.path.dirname(__file__)
        print("Recompiling...")
        create_pages(self.index_file)

        output_fn = cwd + "/bundle/pages.json"
        print("Copying", session.output_fn, "to", output_fn)
        shutil.copyfile(session.output_fn, output_fn)


def parse_args():
    parser = ArgumentParser()
    parser.add_argument("--index", required=True, dest="index_file")
    parser.add_argument("--debug", dest="index_file")
    parser.add_argument("--serve", action="store_true", default=False)
    parser.add_argument("--output-dir", default=".factation")
    parser.add_argument("--stacktrace", action="store_true")

    args = parser.parse_args()

    return args


def create_pages(index_file):
    with open(index_file) as ifs:
        markdown = ifs.read()
    output = parse_markdown(markdown)
    write_output(output)


def report(x):
    print(x)


def create_session(output_dir):
    session = Session(
        "factation.yml",
        output_dir=output_dir,
    )
    session.load_settings()
    set_session(session)
    return session


def main():
    args = parse_args()

    if not os.path.exists(args.index_file):
        report("Index file not found: " + args.index_file)
        sys.exit(1)

    if args.serve:
        input_dir = os.path.dirname(__file__) + "/input"
        event_handler = OnInputFileChanged(args.index_file, args.output_dir)
        event_handler.on_modified(None)
        observer = Observer()
        observer.schedule(event_handler, path=input_dir, recursive=True)
        observer.start()
        serve()
        observer.join()
    elif args.debug:
        create_session(args.output_dir)
        create_pages(args.index_file)
    else:
        try:
            create_session(args.output_dir)
            create_pages(args.index_file)
        except Exception as e:
            report("Error: " + str(e))
            if args.stacktrace:
                traceback.print_exc()


if __name__ == "__main__":
    main()
