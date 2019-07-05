import logging
import sys
from colorful import colorful


def setup_logger(logger, verbose=False):
    handler = logging.StreamHandler(sys.stdout)

    class LevelFormatter(logging.Formatter):
        DEBUG_FORMATTER = logging.Formatter(
            str(colorful.italic_base01('    >>> [DEBUG] %(message)s')))

        def format(self, record):
            if record.levelno == logging.DEBUG:
                return self.DEBUG_FORMATTER.format(record)
            return super(LevelFormatter, self).format(record)

    handler.setFormatter(LevelFormatter())
    logger.addHandler(handler)
    if verbose:
        logger.setLevel(logging.DEBUG)
    else:
        logger.setLevel(logging.INFO)


def get_logger(name):
    return logging.getLogger(name)
