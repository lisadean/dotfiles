#!/usr/bin/env bash

# Minimize Homebrew updates for each run, speeding things up
export HOMEBREW_NO_AUTO_UPDATE=1

function install() {
  package=$1
  # Only install if not already installed
  brew list $package &>/dev/null || brew install $package
}