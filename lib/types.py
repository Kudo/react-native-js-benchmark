import typing


class InstallProps(typing.TypedDict):
    app_id: str
    abi: str
    verbose: bool
    maven_repo_prop: str
    extra_gradle_props: list[str]
