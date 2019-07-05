try:
    import colorful
    colorful.use_style('solarized')
except ImportError:
    class NOPColorful:
        def __call__(self, s):
            return s
        def __getattr__(self, attr):
            return self
    colorful = NOPColorful()
