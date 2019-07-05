from .colorful import colorful


def h1(string):
    return (colorful.blue('#############################################\n') +
            colorful.blue('# ') + colorful.bold_yellow(string) + '\n' +
            colorful.blue('#############################################\n'))


def h2(string):
    return (colorful.base1('---------------------------------------------\n') +
            colorful.yellow(string) + '\n' +
            colorful.base1('---------------------------------------------\n'))
