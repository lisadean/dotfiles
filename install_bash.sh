#!/usr/bin/env bash

install() {
  # explanation about color codes:
  # https://www.howtogeek.com/307701/how-to-customize-and-colorize-your-bash-prompt/
  # https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
  # https://www.shellhacks.com/bash-colors/
  local -r RED_REV='\033[7;31m'
  local -r ORANGE='\033[0;33m'
  local -r GREEN='\033[0;32m'
  local -r RESET='\033[m'
  error() {
    # usage: error "message"
    echo -e "${RED_REV}ERROR:${RESET} $1"
  }
  warning() {
    # usage: warning "message"
    echo -e "${ORANGE}WARNING:${RESET} $1"
  }
  info() {
    # usage: info "message"
    echo -e "INFO: $1"
  }
  installing() {
    # usage: installing "message"
    echo -e "${GREEN}INSTALLING:${RESET} $1"
  }
  if [ -z "$1" ]; then
    echo "Usage: install <file> [destination]"
    return
  fi
  
  # source files are all in ./src/
  local -r dotfiles_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
  local -r source_input="$1"
  local -r source="$dotfiles_dir"/src/$1
  if ! [ -e "$source" ]; then
    error "Source $source does not exist"
    return
  fi

  # if no destination is specified, put it in the home directory
  if [ -z "$2" ]; then
    local -r destination=~/$1
  else
    local -r destination=$2/$1
  fi
    
  if [ -e "$destination" ]; then
    local -r timestamp=$(date +%Y%m%dT%H%M%S)
    local -r destination_backup=${source}.bak.${timestamp}
    if [ -L "$destination" ]; then
      if [ "$(readlink "$destination")" == "$source" ]; then
        info "$source_input is already a symlink to $source"
        return
      fi
      warning "$source_input already exists and is a symlink to $(readlink "$destination") (writing symlink to ${destination_backup}.symlink)"
      if ! readlink "$destination" > "$destination_backup".symlink; then
        error "failed to write symlink to ${destination_backup}.symlink"
        return
      fi
    elif [ -d "$destination" ]; then
      warning "$source_input already exists and is a directory (backing up to $destination_backup)"
      if ! cp -R "$destination" "$destination_backup"; then
        error "failed to backup $destination to $destination_backup"
        return
      fi
      if ! rm -rf "$destination"; then
        error "failed to remove $destination"
        return
      fi
    else
      warning "$source_input exists and is a file (backing up to ${destination_backup})"
      if ! cp "${destination}" "${destination_backup}"; then
        error "failed to backup ${destination} to ${destination_backup}"
        return
      fi
    fi
  fi
  
  installing "$1 to $destination: \c"
  if ! ln -svF "${source}" "${destination}"; then
    error "failed to install ${source} to ${destination}"
    return
  fi
}

install .bash_profile
install .bashrc
install .config
install .npmrc
install .ssh/config
install .ssh/emu_id_ed25519.pub
install .ssh/personal_id_ed25519.pub
install .zshenv
install .zshrc
install bin
install restclient.http ~/work

# Set bash as default shell
# chsh -s /bin/bash
