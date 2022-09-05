class Line:
    def __init__(self, text, words):
        self.text = text
        self.words = words

    def __repr__(self):
        return "Line: " + self.text[:50]


def get_create_line():
    def create_line(text):
        words = text.split()

        return Line(text, words)

    return create_line
