import os

from bottle import route, run, static_file


@route("/")
@route("/<path:path>")
def get_bundle(path=""):
    if path != "" and os.path.exists("/app/src/bundle" + "/" + path):
        return static_file(path, root="/app/src/bundle")
    else:
        return static_file("index.html", root="/app/src/bundle")


def serve():
    run(host="0.0.0.0", port=8000, serve="gunicorn")


if __name__ == "__main__":
    serve()
