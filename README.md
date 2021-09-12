# dotfiles

## Prep

Install [homebrew](https://brew.sh/):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

GitHub CLI:

```bash
brew install gh
```

Cache GH credentials:

```bash
gh auth login
```

Config git (replace email)

```bash
email=lisa.dean@supply.com
git config --global user.name "Lisa Dean"
git config --global user.email $email
git config --global init.defaultBranch main
git config --global init.templatedir '~/dotfiles/.git-templates'
```

Clone repo at home dir root:

```bash
git clone https://github.com/lisadean/dotfiles.git
```

Set default shell to bash

```bash
chsh -s /bin/bash
```

Run `install_dotfiles.sh`

Create `.secrets` file in ~ and set variables

### Homebrew installs

1. Install Google Chrome if needed: `brew install --cask google-chrome`
1. bat: `brew install bat`
1. z: `brew install z`
1. Neofetch: `brew install neofetch`
1. NVM: `brew install nvm`
1. Mac App Store CLI: `brew install mas`
1. 1Password: `brew install --cask 1password`
1. Dropbox: `brew install --cask dropbox`
1. VS Code: `brew install --cask visual-studio-code`
1. Postman: `brew install --cask postman`
1. Docker: `brew install --cask docker`
1. Discord: `brew install --cask discord`
1. Rocket: `brew install --cask rocket`
1. Raindrop: `brew install --cask raindropio`

```bash
brew install bat z neofetch nvm mas
brew install --cask 1password dropbox visual-studio-code postman docker discord rocket raindropio
```

### NVM install of Node

1. Node:

```bash
nvm install --lts
```

### mas installs

1. Slack: `mas install 803453959`
1. Bear: `mas install 1091189122`
1. Magnet: `mas install 441258766`
1. Jump Desktop: `mas install 524141863`
1. Reeder: `mas install 1529448980`
1. Xcode (if needed): `mas install 497799835`

```bash
mas install 803453959 1091189122 441258766 524141863 1529448980
```

## Manual setup

1. Remap CAPS_LOCK to ESCAPE: Preferences > Keyboard > Modifier Keys...
1. Disable spotlight search for everything except

   - Applications
   - Calculator
   - Conversion
   - Definition
   - System Preferences

1. Disable Ask Siri
1. Make cursor one notch bigger: Preferences > Accessibility > Display > Cursor

## Inspiration

(among others):
https://github.com/holman/dotfiles
https://medium.com/@webprolific/getting-started-with-dotfiles-43c3602fd789
