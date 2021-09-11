[ -s ~/.secrets ] && source ~/.secrets
source ~/.aliases
source ~/.functions
source ~/.prompt
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && source "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion" ] && source "/usr/local/opt/nvm/etc/bash_completion"  # This loads nvm bash_completion

# rbenv -- Ruby version manager
# export RBENV_ROOT=/usr/local/var/rbenv
# eval "$(rbenv init -)"

# neofetch
