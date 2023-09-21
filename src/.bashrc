#! /usr/bin/env bash

echo "Loading .bashrc"

####################################################################################################
export DOTFILES_DIR="$HOME/.dotfiles"
export CODE_DIR="$HOME/work"
export CONFIG_DIR="$HOME/.config"

[ -s "$DOTFILES_DIR"/.secrets ] && source "$DOTFILES_DIR"/.secrets
# export GITHUB_TOKEN=${NPM_TOKEN}
source "$CONFIG_DIR"/.bash.paths
source "$CONFIG_DIR"/.bash.aliases
source "$CONFIG_DIR"/.bash.functions
source "$CONFIG_DIR"/.bash.prompt

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export PYENV_ROOT="$HOME/.pyenv"
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi

# Start z script
# . /usr/local/etc/profile.d/z.sh
# commented out because it seems to slow everything down

# neofetch

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
####################################################################################################

[[ -s ~/bin/$(uname -m) ]] && export PATH=~/bin/$(uname -m):~/bin:$PATH
export PATH=~/bin/$(hostname):~/bin:$PATH
export REPO_DIR="$HOME/repos"

function ld() { builtin cd "$@" && ls -laGFT; }

# # This is for working with my dotfiles repo
# # alias config='/usr/bin/git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME'
# # alias cgs='config status'
# # alias cgs-untracked='config status -unormal'
# function git() {
#     if [[ "$PWD" == "$HOME" ]]; then
#       # echo "I'm home"
#       # config "$@"
#       /usr/bin/git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME "$@"
#     else
#       # echo "I'm not home"
#       command git "$@"
#     fi
# }

function gd() {
  GIT_USER_NAME='Lisa Dean'
  GIT_USER_EMAIL='lisa@lisadean.net'
  GIT_USER_EMAIL_FERG='lisa.dean@supply.com'
  builtin cd "$@"
  if [[ "$PWD" == "$REPO_DIR" || "$PWD" == "$HOME" ]]; then
    git config user.name "$GIT_USER_NAME"
    git config user.email "$GIT_USER_EMAIL"
  elif [[ "$PWD" == "$REPO_DIR/ferg" ]]; then
    git config user.name "$GIT_USER_NAME"
    git config user.email "$GIT_USER_EMAIL_FERG"
  fi
  echo "Changed git user.email: $(git config user.email)"
}

[ -e .config/$(hostname).profile ] && . .config/$(hostname).profile