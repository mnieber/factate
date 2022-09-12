from setuptools import find_packages, setup

setup(
    name="factate",
    version="0.1.0",
    description="A documentation system based around examples and facts",
    long_description="A documentation system based around examples and facts",
    long_description_content_type="text/x-rst",
    url="https://github.com/mnieber/factate/blob/main/factate/README.md",
    author="Maarten Nieber",
    author_email="hallomaarten@yahoo.com",
    license="MIT",
    packages=find_packages(),
    package_data={},
    entry_points={
        "console_scripts": [
            "factate=factate.factate:main",
        ]
    },
    data_files=[],
    cmdclass={},
    install_requires=[
        "pyyaml==6.0",
        "inflect==6.0.0",
    ],
    zip_safe=False,
    python_requires=">=3.6",
)
