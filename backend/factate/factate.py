import os
import sys
import traceback
from argparse import ArgumentParser

from factate.factate_dir import create_factate_dir
from factate.serve import create_observer, serve
from factate.session import create_session
from factate.writer.write_output import check_that_index_file_exists, create_pages


def parse_args():
    parser = ArgumentParser()
    parser.add_argument("command", choices=("init", "compile"))
    parser.add_argument("--index", dest="index_file")
    parser.add_argument("--debug", dest="index_file")
    parser.add_argument("--serve", action="store_true", default=False)
    parser.add_argument("--copy-to")
    parser.add_argument("--stacktrace", action="store_true")

    args = parser.parse_args()

    if args.command == "init" and not args.index_file:
        report("The --index argument is required for init")
        sys.exit(1)

    return args


def report(x):
    print(x)


def main():
    __import__("pudb").set_trace()
    args = parse_args()

    if args.command == "init":
        if not os.path.exists(args.index_file):
            report("Warning: index file not found: " + args.index_file)
            report(
                "Please correct this by creating this file, or by editing .factate/config.yml"
            )

        factate_dir = ".factate"
        if os.path.exists(factate_dir):
            report("Directory already exists: " + factate_dir)
            sys.exit(1)

        create_factate_dir(
            factate_dir,
            args.index_file,
            bundle_dir=os.path.join(os.path.dirname(__file__), "..", "bundle"),
        )
        sys.exit(0)

    session = create_session()
    check_that_index_file_exists()

    if args.command == "compile" and args.serve:
        input_dir = os.path.dirname(session.settings["index_file"])
        observer = create_observer(input_dir, args.copy_to)
        serve()
        observer.join()
        sys.exit(0)

    if args.command == "compile":
        try:
            create_pages()
        except Exception as e:
            if args.debug:
                raise
            report("Error: " + str(e))
            if args.stacktrace:
                traceback.print_exc()


if __name__ == "__main__":
    main()
