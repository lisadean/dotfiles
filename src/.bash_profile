[ -s ~/.secrets ] && source ~/.secrets
source ~/.paths
source ~/.aliases
source ~/.functions
source ~/.prompt

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Start z script
. /usr/local/etc/profile.d/z.sh

# neofetch