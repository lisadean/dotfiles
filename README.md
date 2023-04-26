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
git config --global pull.rebase false
git config --global core.excludesfile ~/.gitignore_global
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
1. --or-- Brave: `brew install --cask brave-browser`
1. bat: `brew install bat`
1. z: `brew install z`
1. Neofetch: `brew install neofetch`
1. Mac App Store CLI: `brew install mas`
1. Tree: `brew install tree`
1. 1Password: `brew install --cask 1password`
1. Dropbox: `brew install --cask dropbox`
1. VS Code: `brew install --cask visual-studio-code`
1. Postman: `brew install --cask postman`
1. Docker: `brew install --cask docker`
1. Discord: `brew install --cask discord`
1. Rocket: `brew install --cask rocket`
1. Raindrop: `brew install --cask raindropio`
1. WhatsApp: `brew install --cask whatsapp`
1. Fira font: `brew install --cask homebrew/cask-fonts/font-fira-code`
1. GitHub Desktop: `brew install --cask github`
1. Parallels: `brew install --cask parallels`
1. DB Browser for SQLLite: `brew install --cask db-browser-for-sqlite`
1. Rectangle: `brew install --cask rectangle`
1. Python Install Manager: `brew install pyenv`
1. tldr: `brew install tldr`

```bash
brew install bat z neofetch mas tree tldr; brew install --cask 1password dropbox visual-studio-code postman docker discord rocket raindropio whatsapp homebrew/cask-fonts/font-fira-code github parallels brave-browser db-browser-for-sqlite pyenv rectangle
```

### Install NVM and Node

1. NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

1. Node

```bash
nvm install --lts
```

### mas installs

1. Slack: `mas install 803453959`
1. Bear: `mas install 1091189122`
1. ~~Magnet: `mas install 441258766`~~
1. Reeder: `mas install 1529448980`
1. Xcode (if needed): `mas install 497799835`

```bash
mas install 803453959 1091189122 1529448980
```

## Manual setup

1. Install Jump Desktop Connect: https://www.jumpdesktop.com/connect/
1. Install MuteMe software: https://muteme.com/pages/downloads
1. Remap CAPS_LOCK to ESCAPE if needed: Preferences > Keyboard > Modifier Keys...
1. Turn off Space rearranging: Preferences > Mission Control > Automatically rearrange Spaces based on most recent use
1. Disable spotlight search for everything except

   - Applications
   - Calculator
   - Conversion
   - Definition
   - System Preferences

1. Disable Ask Siri
1. Make cursor one notch bigger: Preferences > Accessibility > Display > Cursor
1. Python might need some manual setup still: https://www.freecodecamp.org/news/python-version-on-mac-update/

## Inspiration

(among others):
https://github.com/holman/dotfiles
https://medium.com/@webprolific/getting-started-with-dotfiles-43c3602fd789

## Submodules and other code

Using submodules: http://git-scm.com/book/en/v2/Git-Tools-Submodules

Git toolkit: https://gist.github.com/eeichinger/1044107a1126901249b1164dac2fce15

Extending git: https://coderwall.com/p/bt93ia/extend-git-with-custom-commands
