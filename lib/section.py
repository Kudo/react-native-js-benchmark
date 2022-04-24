from .colorful import colorful


def h1(string):
    return (
        "\n"
        + colorful.blue("#############################################\n")
        + colorful.blue("# ")
        + colorful.bold_yellow(string)
        + "\n"
        + colorful.blue("#############################################\n")
    )


def h2(string):
    return (
        "\n"
        + colorful.base1("---------------------------------------------\n")
        + colorful.yellow(string)
        + "\n"
        + colorful.base1("---------------------------------------------\n")
    )
