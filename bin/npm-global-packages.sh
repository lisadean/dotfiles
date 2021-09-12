#!/bin/sh

# from https://medium.com/@alberto.schiabel/npm-tricks-part-1-get-list-of-globally-installed-packages-39a240347ef0

# npm: the Node package manager command line tool
# list -g: display a tree of every package found in the user’s folders (without the -g option it only shows the current directory’s packages)
# — depth 0 / — depth=0: avoid including every package’s dependencies in the tree view

npm list -g --depth 0