#!/usr/bin/env bash

# chsh -s /bin/zsh

DOTFILES_DIR=`pwd`
echo $(dirname $0)
# TODO:
# https://scriptingosx.com/2019/07/moving-to-zsh-part-4-aliases-and-functions/
# https://scriptingosx.com/2021/03/script-identity-crisis-get-the-path-to-the-current-script/

function install() {
  file=$1
  target=~/${file}
  source="${DOTFILES_DIR}/src/${file}"
  if [ -e $target ] && ! [ -L $target ]; then
    backup_file=$target.bak$(date +%s)
    echo "$file exists: Backing up to $backup_file"
    cp $target $target.bak$(date +%s)
  fi
  ln -svf "$source" ~
}

# install .zshenv
# install .zshrc
# install .aliases
# install .functions
# install .gitignore_global
# install .prompt
# install .paths
# install .npmrc
# install restclient.http
