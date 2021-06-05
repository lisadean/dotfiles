# dotfiles

 ## Setup new computer

```

# Generate new SSH key and copy to clipboard to add to Github account
ssh-keygen -t ed25519 -C "lisa@lisadean.net"
pbcopy < ~/.ssh/id_ed25519.pub

# Change default shell to bash
chsh -s /bin/bash

# Clone git repo to $HOME and run install_dotfiles.sh

# Install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Google Chrome
brew install --cask google-chrome

# Install 1Password
brew install --cask 1password

# Install VS Code
brew install --cask visual-studio-code

# Install NVM & node
brew install nvm
nvm install node
nvm install --lts

# Install Dropbox
brew install --cask dropbox
```



## Inspiration

(among others):  
https://github.com/holman/dotfiles  
https://medium.com/@webprolific/getting-started-with-dotfiles-43c3602fd789  
