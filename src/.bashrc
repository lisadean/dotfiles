[ -s ~/.secrets ] && source ~/.secrets
source ~/.aliases
source ~/.functions
source ~/.prompt

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# rbenv -- Ruby version manager
# export RBENV_ROOT=/usr/local/var/rbenv
# eval "$(rbenv init -)"

# neofetch
