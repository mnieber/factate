import os
import sys

# import traceback
from argparse import ArgumentParser

from factate.parser.parser import parse_markdown
from factate.session import Session, set_session
from factate.writer.write_output import write_output


def create_parser():
    parser = ArgumentParser()
    parser.add_argument("--index", required=True, dest="index_file")
    parser.add_argument("--output-dir", required=False, default=".factation")
    parser.add_argument("--stacktrace", required=False, action="store_true")

    return parser


def create_pages(index_file, session):
    with open(index_file) as ifs:
        markdown = ifs.read()
    parse_markdown(markdown)
    write_output()


def report(x):
    print(x)


if __name__ == "__main__":
    parser = create_parser()
    args = parser.parse_args()

    if not os.path.exists(args.index_file):
        report("Index file not found: " + args.index_file)
        sys.exit(1)

    session = Session(
        args.output_dir,
        "factation.yml",
        output_dir=args.output_dir,
    )
    session.load_settings()
    set_session(session)

    try:
        create_pages(args.index_file, session)
    # except Exception as e:
    #     report("Error: " + str(e))
    #     if args.stacktrace:
    #         traceback.print_exc()
    finally:
        pass
