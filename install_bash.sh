#!/usr/bin/env bash

chsh -s /bin/bash

DOTFILES_DIR=`pwd`

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

install .bash_profile
install .aliases
install .functions
install .gitignore_global
install .prompt
install .paths
install .npmrc
install restclient.http
install .gitconfig
ln -svf "${DOTFILES_DIR}/src/.ssh_config" ~/.ssh/config
ln -svf "${DOTFILES_DIR}/src/emu_id_ed25519.pub" ~/.ssh/emu_id_ed25519.pub
ln -svf "${DOTFILES_DIR}/src/personal_id_ed25519.pub" ~/.ssh/personal_id_ed25519.pub
